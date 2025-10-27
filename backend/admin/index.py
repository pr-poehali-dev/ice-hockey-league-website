'''
Business: Админ API для управления всеми данными PHL (команды, матчи, чемпионы)
Args: event - dict с httpMethod, body
      context - объект с request_id
Returns: HTTP response с результатом операции
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

ADMIN_KEY = 'phldyeztop'

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    admin_key = headers.get('x-admin-key') or headers.get('X-Admin-Key')
    
    if admin_key != ADMIN_KEY:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', '')
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if action == 'update_match_result':
            match_id = body_data['match_id']
            home_score = body_data['home_score']
            away_score = body_data['away_score']
            overtime = body_data.get('overtime', False)
            shootout = body_data.get('shootout', False)
            
            cur.execute('SELECT home_team_id, away_team_id FROM matches WHERE id = %s', (match_id,))
            match = cur.fetchone()
            home_team_id = match['home_team_id']
            away_team_id = match['away_team_id']
            
            cur.execute('''
                UPDATE matches 
                SET home_score = %s, away_score = %s, status = 'finished',
                    overtime = %s, shootout = %s
                WHERE id = %s
                RETURNING id
            ''', (home_score, away_score, overtime, shootout, match_id))
            
            home_win = home_score > away_score
            
            if home_win:
                winner_id = home_team_id
                loser_id = away_team_id
            else:
                winner_id = away_team_id
                loser_id = home_team_id
            
            if overtime or shootout:
                cur.execute('''
                    UPDATE team_stats 
                    SET games_played = games_played + 1,
                        wins_ot = wins_ot + CASE WHEN %s THEN 1 ELSE 0 END,
                        wins_so = wins_so + CASE WHEN %s THEN 1 ELSE 0 END,
                        goals_for = goals_for + %s,
                        goals_against = goals_against + %s,
                        points = points + 2
                    WHERE team_id = %s
                ''', (overtime, shootout, home_score if home_win else away_score, away_score if home_win else home_score, winner_id))
                
                cur.execute('''
                    UPDATE team_stats 
                    SET games_played = games_played + 1,
                        losses_ot = losses_ot + CASE WHEN %s THEN 1 ELSE 0 END,
                        losses_so = losses_so + CASE WHEN %s THEN 1 ELSE 0 END,
                        goals_for = goals_for + %s,
                        goals_against = goals_against + %s,
                        points = points + 1
                    WHERE team_id = %s
                ''', (overtime, shootout, away_score if home_win else home_score, home_score if home_win else away_score, loser_id))
            else:
                cur.execute('''
                    UPDATE team_stats 
                    SET games_played = games_played + 1,
                        wins = wins + 1,
                        goals_for = goals_for + %s,
                        goals_against = goals_against + %s,
                        points = points + 2
                    WHERE team_id = %s
                ''', (home_score if home_win else away_score, away_score if home_win else home_score, winner_id))
                
                cur.execute('''
                    UPDATE team_stats 
                    SET games_played = games_played + 1,
                        losses = losses + 1,
                        goals_for = goals_for + %s,
                        goals_against = goals_against + %s,
                        points = points + 0
                    WHERE team_id = %s
                ''', (away_score if home_win else home_score, home_score if home_win else away_score, loser_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Match result updated'}),
                'isBase64Encoded': False
            }
        
        elif action == 'add_match':
            date = body_data['date']
            time = body_data['time']
            home_team_id = body_data['home_team_id']
            away_team_id = body_data['away_team_id']
            
            cur.execute('''
                INSERT INTO matches (date, time, home_team_id, away_team_id, status)
                VALUES (%s, %s, %s, %s, 'upcoming')
                RETURNING id
            ''', (date, time, home_team_id, away_team_id))
            
            result = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'match_id': result['id']}),
                'isBase64Encoded': False
            }
        
        elif action == 'delete_match':
            match_id = body_data['match_id']
            
            cur.execute('UPDATE matches SET status = %s WHERE id = %s', ('cancelled', match_id))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Match cancelled'}),
                'isBase64Encoded': False
            }
        
        elif action == 'update_team':
            team_id = body_data['team_id']
            name = body_data.get('name')
            logo = body_data.get('logo')
            city = body_data.get('city')
            arena = body_data.get('arena')
            division = body_data.get('division')
            
            updates = []
            params = []
            
            if name: 
                updates.append('name = %s')
                params.append(name)
            if logo: 
                updates.append('logo = %s')
                params.append(logo)
            if city: 
                updates.append('city = %s')
                params.append(city)
            if arena: 
                updates.append('arena = %s')
                params.append(arena)
            if division: 
                updates.append('division = %s')
                params.append(division)
            
            params.append(team_id)
            
            cur.execute(f'''
                UPDATE teams 
                SET {', '.join(updates)}
                WHERE id = %s
                RETURNING id
            ''', params)
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Team updated'}),
                'isBase64Encoded': False
            }
        
        elif action == 'add_champion':
            year = body_data['year']
            team_id = body_data['team_id']
            finals = body_data['finals']
            
            cur.execute('''
                INSERT INTO champions (year, team_id, finals)
                VALUES (%s, %s, %s)
                ON CONFLICT (year) DO UPDATE 
                SET team_id = EXCLUDED.team_id, finals = EXCLUDED.finals
                RETURNING id
            ''', (year, team_id, finals))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Champion added'}),
                'isBase64Encoded': False
            }
        
        elif action == 'update_setting':
            setting_key = body_data['setting_key']
            setting_value = body_data['setting_value']
            
            cur.execute('''
                UPDATE league_settings 
                SET setting_value = %s, updated_at = CURRENT_TIMESTAMP
                WHERE setting_key = %s
                RETURNING id
            ''', (setting_value, setting_key))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Setting updated'}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid action'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
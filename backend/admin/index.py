'''
Business: Админ API для управления матчами PHL (добавление, обновление результатов)
Args: event - dict с httpMethod, body
      context - объект с request_id
Returns: HTTP response с результатом операции
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

ADMIN_KEY = 'phl_admin_2024'

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
                'Access-Control-Allow-Methods': 'POST, PUT, OPTIONS',
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
            
            cur.execute('''
                UPDATE matches 
                SET home_score = %s, away_score = %s, status = 'finished',
                    overtime = %s, shootout = %s
                WHERE id = %s
                RETURNING id
            ''', (home_score, away_score, overtime, shootout, match_id))
            
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

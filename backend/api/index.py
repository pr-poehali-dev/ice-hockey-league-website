'''
Business: API для получения данных PHL (команды, матчи, турнирная таблица, чемпионы)
Args: event - dict с httpMethod, queryStringParameters
      context - объект с request_id
Returns: HTTP response с данными из PostgreSQL
'''

import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters', {}) or {}
    endpoint = params.get('endpoint', '')
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if endpoint == 'teams':
            cur.execute('SELECT * FROM teams ORDER BY name')
            teams = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'teams': teams}, default=str),
                'isBase64Encoded': False
            }
        
        elif endpoint == 'matches':
            cur.execute('''
                SELECT 
                    m.id, m.date, m.time, m.home_score, m.away_score, 
                    m.status, m.overtime, m.shootout,
                    ht.id as home_team_id, ht.name as home_team_name, 
                    ht.logo as home_team_logo, ht.city as home_team_city,
                    ht.founded as home_team_founded, ht.arena as home_team_arena,
                    at.id as away_team_id, at.name as away_team_name,
                    at.logo as away_team_logo, at.city as away_team_city,
                    at.founded as away_team_founded, at.arena as away_team_arena
                FROM matches m
                JOIN teams ht ON m.home_team_id = ht.id
                JOIN teams at ON m.away_team_id = at.id
                ORDER BY m.date DESC, m.time DESC
            ''')
            rows = cur.fetchall()
            
            matches = []
            for row in rows:
                matches.append({
                    'id': row['id'],
                    'date': str(row['date']),
                    'time': row['time'],
                    'homeScore': row['home_score'],
                    'awayScore': row['away_score'],
                    'status': row['status'],
                    'overtime': row['overtime'],
                    'shootout': row['shootout'],
                    'homeTeam': {
                        'id': row['home_team_id'],
                        'name': row['home_team_name'],
                        'logo': row['home_team_logo'],
                        'city': row['home_team_city'],
                        'founded': row['home_team_founded'],
                        'arena': row['home_team_arena']
                    },
                    'awayTeam': {
                        'id': row['away_team_id'],
                        'name': row['away_team_name'],
                        'logo': row['away_team_logo'],
                        'city': row['away_team_city'],
                        'founded': row['away_team_founded'],
                        'arena': row['away_team_arena']
                    }
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'matches': matches}),
                'isBase64Encoded': False
            }
        
        elif endpoint == 'champions':
            cur.execute('''
                SELECT c.id, c.year, c.finals,
                       t.id as team_id, t.name as team_name, t.logo as team_logo,
                       t.city as team_city, t.founded as team_founded, t.arena as team_arena
                FROM champions c
                JOIN teams t ON c.team_id = t.id
                ORDER BY c.year DESC
            ''')
            rows = cur.fetchall()
            
            champions = []
            for row in rows:
                champions.append({
                    'year': row['year'],
                    'finals': row['finals'],
                    'team': {
                        'id': row['team_id'],
                        'name': row['team_name'],
                        'logo': row['team_logo'],
                        'city': row['team_city'],
                        'founded': row['team_founded'],
                        'arena': row['team_arena']
                    }
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'champions': champions}),
                'isBase64Encoded': False
            }
        
        elif endpoint == 'standings':
            cur.execute('''
                SELECT 
                    ts.*,
                    t.id as team_id, t.name as team_name, t.logo as team_logo,
                    t.city as team_city, t.founded as team_founded, t.arena as team_arena
                FROM team_stats ts
                JOIN teams t ON ts.team_id = t.id
                ORDER BY ts.points DESC, (ts.goals_for - ts.goals_against) DESC, ts.goals_for DESC
            ''')
            rows = cur.fetchall()
            
            standings = []
            for row in rows:
                standings.append({
                    'team': {
                        'id': row['team_id'],
                        'name': row['team_name'],
                        'logo': row['team_logo'],
                        'city': row['team_city'],
                        'founded': row['team_founded'],
                        'arena': row['team_arena']
                    },
                    'games': row['games_played'],
                    'wins': row['wins'],
                    'losses': row['losses'],
                    'overtimeLosses': row['losses_ot'],
                    'shootoutLosses': row['losses_so'],
                    'goalsFor': row['goals_for'],
                    'goalsAgainst': row['goals_against'],
                    'points': row['points']
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'standings': standings}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid endpoint'}),
                'isBase64Encoded': False
            }
    
    finally:
        cur.close()
        conn.close()
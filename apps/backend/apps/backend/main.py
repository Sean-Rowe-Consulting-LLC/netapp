import json

import psycopg2-binary

# Connect to RDS once at startup
conn = psycopg2.connect(
  host=os.environ['RDS_HOST'],
  database=os.environ['RDS_DB_NAME'],
  user=os.environ['RDS_USER'],
  password=os.environ['RDS_PASSWORD']
)


def lambda_handler(event, context):
  # Use a connection pool to reuse connections
  cursor = conn.cursor()

  sort_key = event.get('sortKey')

  cursor.execute("SELECT * FROM server_costs ORDER BY " + sort_key)

  server_costs = cursor.fetchall()

  formatted_costs = []

  for cost in server_costs:
    formatted_cost = {
      'name': cost[0],
      'provider': cost[1],
      # Format data
    }
    formatted_costs.append(formatted_cost)

  cursor.close()

  return {
    'statusCode': 200,
    'body': json.dumps(formatted_costs)
  }

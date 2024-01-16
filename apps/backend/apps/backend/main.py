import json
import os

import psycopg2  # Added this line


def lambda_handler(event, context):
    conn = None
    cur = None

    try:
        # Get database connection details from environment variables
        host = os.environ["host"]
        user = os.environ["DB_USER"]
        password = os.environ["DB_PASSWORD"]
        database = os.environ["DB_NAME"]

        # Connect to database
        conn_string = (
            f"dbname='{database}' user='{user}' host='{host}' password='{password}'"
        )
        conn = psycopg2.connect(conn_string)

        # Create a new cursor
        cur = conn.cursor()

        # Execute SQL command to fetch data
        cur.execute("SELECT * FROM servers")
        rows = cur.fetchall()

        # Convert data to list of dicts
        columns = [desc[0] for desc in cur.description]
        data = [dict(zip(columns, row)) for row in rows]

        return {"statusCode": 200, "body": json.dumps(data)}

    except Exception as e:
        print("Database connection failed due to {}".format(e))
        return {"statusCode": 500, "body": json.dumps("An error occurred")}
    finally:
        cur.close()
        conn.close()

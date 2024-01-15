<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>

# Requirements Document

## Project Name

Web Application with Nx, EKS, Lambda, RDS, and S3

## Project Goal

To build and deploy a scalable, reliable, and secure web application using Nx, EKS, Lambda, RDS, and S3, showcasing advanced skills in server-side sorting with AWS Lambda and Python using FastAPI.

## Functional Requirements

- The web application shall be built using the Nx framework.
- The web application shall be deployed to an EKS cluster.
- The web application shall use a Lambda function for server-side sorting of the "Server Costs" table.
- The Lambda function shall:
    - Fetch server cost data from the RDS database.
    - Perform sorting based on user input (name or total cost to date).
    - Format dates in mm/yy format and costs in US currency.
    - Return the sorted data to the frontend.
- The web application shall display the sorted "Server Costs" table with the following columns:
    - Name
    - Provider
    - Monthly Cost
    - Start Date
    - Months Running
    - Total Cost to Date
- The web application shall also display an overall sum of all server costs to date below the table.
- Everything on the page shall be labeled and styled clearly and accessibly.

## Constraints

- The web application must be deployed to the AWS cloud.
- The web application must use the Nx framework.
- The server-side sorting logic must be implemented in a Python Lambda function with FastAPI.

## Acceptance Criteria

- The web application shall be successfully deployed to an EKS cluster.
- The web application shall be able to handle increasing traffic.
- The web application shall be available 24/7.
- The web application shall protect user data.
- The Lambda function shall accurately sort the "Server Costs" table based on user input.
- All dates and costs shall be displayed in the specified formats.
- The page design shall be clear and user-friendly.

## Technical Considerations

- **Lambda Limits:** Monitor the Lambda function's execution time and memory usage to ensure efficient sorting operations.
- **FastAPI in Lambda:** Employ best practices for using FastAPI within Lambda, considering potential limitations.
- **Database Interactions:** Establish secure and efficient communication between the Lambda function and the RDS database for data retrieval.
- **Data Formatting:** Use appropriate libraries or techniques to format dates and currency within the Lambda function.

##  Architecture Design

```mermaid
sequenceDiagram
    participant A as Frontend
    participant B as Backend API
    participant C1 as Lambda Function for Sorting
    participant C2 as Lambda Function for Formatting
    participant D as RDS Database
    rect rgba(0, 255, 0, .3)
        Note over A,B: Load balancer in use
        A->>+B: Send server costs table, sorting options
    end
    rect rgba(0, 255, 0, .3)
        Note over B,C1: Queue in place
        B->>C1: Forward sort request
    end
    rect rgba(0, 255, 0, .3)
        C1->>C2: Pass server cost data for formatting
    end
    rect rgba(0, 255, 0, .3)
        Note over C2,D: One DynamoDB database in use
        C2->>D: Store/retrieve from Database
    end
    rect rgba(0, 255, 0, .3)
        D->>C2: Pass sorted data for formatting
    end
    rect rgba(0, 255, 0, .3)
        C2->>B: Return formatted data to Backend
    end
    rect rgba(0, 255, 0, .3)
        B->>A: Return sorted data to Frontend
    end
    Note over A: Display table
    Note over A: Error handling & logging activated
    Note over B: Error handling & logging activated
    Note over C1: Error handling & logging activated
    Note over C2: Error handling & logging activated
    Note over D: Error handling & logging activated
```

2. Lambda Function Development
3. Frontend Integration
4. Testing and Deployment

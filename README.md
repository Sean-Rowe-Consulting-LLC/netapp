# Instructions

Using javascript, HTML, and CSS (plus any libraries or platforms if you want), display the data from this JSON object for the user according to the given requirements.

```typescript
const serverCosts = [
  {
    id: '2362852346',
    name: 'Test',
    provider: 'AWS',
    monthly_cost: '0.60',
    start_date: '1577836800000'
  },
  {
    id: '1047946121',
    name: 'MyTest',
    provider: 'Azure',
    monthly_cost: '0.17',
    start_date: '1582934400000'
  }, {
    id: '2425838433',
    name: 'YourTest',
    provider: 'AWS',
    monthly_cost: '1.29',
    start_date: '1625270400000'
  },
  {
    id: '6309039215',
    name: 'Their Test',
    provider: 'GCP',
    monthly_cost: '0.27',
    start_date: '1585699200000'
  },
  {
    id: '5343585185',
    name: 'name',
    provider: 'Azure',
    monthly_cost: '4.01',
    start_date: '1622505600000'
  }
]; 
```

## Requirements
1. Display the data in a table entitled "Server Costs" with columns for the name, the provider, the monthly cost, the start date, how many months the server has been running, and how much has been spent on each server to date. The rows should be sorted by server name. Costs are per month, even if the server was only running for part of that month.
 
2. Add buttons or other inputs that allow the user to sort the table by name or by total cost to date. 

3. Show an overall sum of all server costs to date as a single amount below the table.

4. Display all dates in the format mm/yy and all costs as US currency.

5. Label and style everything in a pleasing and easy to understand way.

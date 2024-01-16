import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ServersEntity } from './state/servers.models';

@Injectable({
  providedIn: 'root',
})
export class ServersService {
  getServers(): Observable<ServersEntity[]> {
    return of([
      {
        id: '2362852346',
        name: 'Test',
        provider: 'AWS',
        monthly_cost: '0.60',
        start_date: '1577836800000',
      },
      {
        id: '1047946121',
        name: 'MyTest',
        provider: 'Azure',
        monthly_cost: '0.17',
        start_date: '1582934400000',
      },
      {
        id: '2425838433',
        name: 'YourTest',
        provider: 'AWS',
        monthly_cost: '1.29',
        start_date: '1625270400000',
      },
      {
        id: '6309039215',
        name: 'Their Test',
        provider: 'GCP',
        monthly_cost: '0.27',
        start_date: '1585699200000',
      },
      {
        id: '5343585185',
        name: 'name',
        provider: 'Azure',
        monthly_cost: '4.01',
        start_date: '1622505600000',
      },
    ]).pipe(
      map((servers) =>
        servers.map((server) => {
          const startDate = new Date(Number(server.start_date));
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth();
          const startYear = startDate.getFullYear();
          const startMonth = startDate.getMonth();

          // calculate total months from start date to current date
          const totalMonths =
            (currentYear - startYear) * 12 + (currentMonth - startMonth + 1);

          // calculate cost to date from start date
          const costToDate = Number(server.monthly_cost) * totalMonths;

          // update the object
          return {
            ...server,
            total_cost: costToDate.toFixed(2),
          };
        })
      )
    );
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NetappTableDataSource } from './netapp-table-datasource';
import { ServersEntity } from '../../features/servers/state/servers.models';
import { initServers } from '../../features/servers/state/servers.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'netapp-netapp-table',
  templateUrl: './netapp-table.component.html',
  styleUrl: './netapp-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CurrencyPipe,
    DatePipe,
  ],
})
export class NetappTableComponent implements AfterViewInit {
  servers$: Observable<ServersEntity[]>;
  dataSource: NetappTableDataSource;
  overallTotal: number = 0;

  displayedColumns = [
    'name',
    'provider',
    'start_date',
    'monthly_cost',
    'total_cost',
  ];

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: ServersEntity) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: ServersEntity) => `${element.name}`,
    },
    {
      columnDef: 'provider',
      header: 'Provider',
      cell: (element: ServersEntity) => `${element.provider}`,
    },
    {
      columnDef: 'monthly_cost',
      header: 'Monthly Cost',
      cell: (element: ServersEntity) => `${element.monthly_cost}`,
    },
    {
      columnDef: 'start_date',
      header: 'Start Date',
      cell: (element: ServersEntity) => `${element.start_date}`,
    },
    {
      columnDef: 'total_cost',
      header: 'Total Cost',
      cell: (element: ServersEntity) => `${element.total_cost}`,
    },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ServersEntity>;

  constructor(private readonly store: Store<{ servers: ServersEntity[] }>) {
    this.dataSource = new NetappTableDataSource();
    this.servers$ = this.store.select('servers');
  }

  ngAfterViewInit(): void {
    this.store.dispatch(initServers());

    this.servers$.subscribe((data) => {
      this.dataSource.data = data[
        'entities' as never
      ] as unknown as ServersEntity[];

      this.sort.active = 'name';
      this.sort.direction = 'asc';

      this.sort.sortChange.emit({
        active: this.sort.active,
        direction: this.sort.direction,
      });

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;

      this.overallTotal = Object.values(this.dataSource.data)
        .map((t) => Number(t.total_cost))
        .reduce((acc, value) => acc + value, 0);
    });
  }
}

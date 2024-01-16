import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { merge, Observable, of, of as observableOf } from 'rxjs';
import { ServersEntity } from '../../features/servers/state/servers.models';

/**
 * Data source for the NetappTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class NetappTableDataSource extends DataSource<ServersEntity> {
  data: ServersEntity[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ServersEntity[]> {
    if (!(this.paginator && this.sort)) {
      return of([]);
    }

    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return merge(
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ).pipe(
      map(() => {
        return this.getPagedData(
          this.getSortedData([...Object.values(this.data)])
        );
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ServersEntity[]): ServersEntity[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ServersEntity[]): ServersEntity[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === SortDirection.Asc;
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'total_cost':
          return compare(a.total_cost!, b.total_cost!, isAsc);
        default:
          return 0;
      }
    });
  }
}

enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  let result: number;

  if (!isNaN(Number(a)) && !isNaN(Number(b))) {
    result = Number(a) - Number(b);
  } else {
    result = String(a).localeCompare(String(b));
  }

  return isAsc ? result : -result;
}

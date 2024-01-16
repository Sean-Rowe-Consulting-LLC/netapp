import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ServersService } from '../servers.service';
import * as ServersActions from './servers.actions';

@Injectable()
export class ServersEffects {
  private actions$ = inject(Actions);
  private serversService = inject(ServersService); // Inject ServersService

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServersActions.initServers),
      switchMap(() =>
        this.serversService.getServers().pipe(
          // Call method in ServersService
          map((servers) => {
            return ServersActions.loadServersSuccess({ servers });
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(ServersActions.loadServersFailure({ error }));
          })
        )
      )
    )
  );
}

import { createAction, props } from '@ngrx/store';
import { ServersEntity } from './servers.models';

export const initServers = createAction('[Servers Page] Init');

export const loadServersSuccess = createAction(
  '[Servers/API] Load Servers Success',
  props<{ servers: ServersEntity[] }>()
);

export const loadServersFailure = createAction(
  '[Servers/API] Load Servers Failure',
  props<{ error: string | null }>()
);

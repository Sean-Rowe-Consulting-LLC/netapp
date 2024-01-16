import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ServersActions from './servers.actions';
import { ServersEntity } from './servers.models';

export const SERVERS_FEATURE_KEY = 'servers';

export interface ServersState extends EntityState<ServersEntity> {
  selectedId?: string | number; // which Servers record has been selected
  loaded: boolean; // has the Servers list been loaded
  error?: string | null; // last known error (if any)
}

export interface ServersPartialState {
  readonly [SERVERS_FEATURE_KEY]: ServersState;
}

export const serversAdapter: EntityAdapter<ServersEntity> =
  createEntityAdapter<ServersEntity>();

export const initialServersState: ServersState = serversAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false
  }
);

const reducer = createReducer(
  initialServersState,
  on(ServersActions.initServers, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ServersActions.loadServersSuccess, (state, { servers }) =>
    serversAdapter.setAll(servers, { ...state, loaded: true })
  ),
  on(ServersActions.loadServersFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function serversReducer(
  state: ServersState | undefined,
  action: Action
) {
  return reducer(state, action);
}

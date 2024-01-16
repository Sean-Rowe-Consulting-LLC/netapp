import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SERVERS_FEATURE_KEY,
  ServersState,
  serversAdapter,
} from './servers.reducer';

// Lookup the 'Servers' feature state managed by NgRx
export const selectServersState =
  createFeatureSelector<ServersState>(SERVERS_FEATURE_KEY);

const { selectAll, selectEntities } = serversAdapter.getSelectors();

export const selectServersLoaded = createSelector(
  selectServersState,
  (state: ServersState) => state.loaded
);

export const selectServersError = createSelector(
  selectServersState,
  (state: ServersState) => state.error
);

export const selectAllServers = createSelector(
  selectServersState,
  (state: ServersState) => selectAll(state)
);

export const selectServersEntities = createSelector(
  selectServersState,
  (state: ServersState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectServersState,
  (state: ServersState) => state.selectedId
);

export const selectEntity = createSelector(
  selectServersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

import { Action } from '@ngrx/store';

import * as ServersActions from './servers.actions';
import { ServersEntity } from './servers.models';
import {
  ServersState,
  initialServersState,
  serversReducer,
} from './servers.reducer';

describe('Servers Reducer', () => {
  const createServersEntity = (id: string, name = ''): ServersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Servers actions', () => {
    it('loadServersSuccess should return the list of known Servers', () => {
      const servers = [
        createServersEntity('PRODUCT-AAA'),
        createServersEntity('PRODUCT-zzz'),
      ];
      const action = ServersActions.loadServersSuccess({ servers });

      const result: ServersState = serversReducer(initialServersState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = serversReducer(initialServersState, action);

      expect(result).toBe(initialServersState);
    });
  });
});

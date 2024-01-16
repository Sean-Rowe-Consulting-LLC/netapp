import { ServersEntity } from './servers.models';
import {
  serversAdapter,
  ServersPartialState,
  initialServersState,
} from './servers.reducer';
import * as ServersSelectors from './servers.selectors';

describe('Servers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getServersId = (it: ServersEntity) => it.id;
  const createServersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ServersEntity);

  let state: ServersPartialState;

  beforeEach(() => {
    state = {
      servers: serversAdapter.setAll(
        [
          createServersEntity('PRODUCT-AAA'),
          createServersEntity('PRODUCT-BBB'),
          createServersEntity('PRODUCT-CCC'),
        ],
        {
          ...initialServersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Servers Selectors', () => {
    it('selectAllServers() should return the list of Servers', () => {
      const results = ServersSelectors.selectAllServers(state);
      const selId = getServersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ServersSelectors.selectEntity(state) as ServersEntity;
      const selId = getServersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectServersLoaded() should return the current "loaded" status', () => {
      const result = ServersSelectors.selectServersLoaded(state);

      expect(result).toBe(true);
    });

    it('selectServersError() should return the current "error" state', () => {
      const result = ServersSelectors.selectServersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

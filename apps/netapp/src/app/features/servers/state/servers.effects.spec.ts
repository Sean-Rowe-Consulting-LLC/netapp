import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ServersActions from './servers.actions';
import { ServersEffects } from './servers.effects';

describe('ServersEffects', () => {
  let actions: Observable<Action>;
  let effects: ServersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ServersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ServersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ServersActions.initServers() });

      const expected = hot('-a-|', {
        a: ServersActions.loadServersSuccess({ servers: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromServers from './features/servers/state/servers.reducer';
import { ServersEffects } from './features/servers/state/servers.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(ServersEffects),
    provideState(fromServers.SERVERS_FEATURE_KEY, fromServers.serversReducer),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(),
    provideStore(),
    provideClientHydration(),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withFetch())
  ]
};

import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  AuthStore,
  provideAuthData,
  provideProjectData,
  provideTaskData,
  provideUserData,
} from '@devflow/web-data-access';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    provideProjectData(),
    provideTaskData(),
    provideUserData(),
    provideAuthData(),
    provideAppInitializer(() => inject(AuthStore).initialize()),
  ],
};

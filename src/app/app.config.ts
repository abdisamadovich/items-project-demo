import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './api/Interceptor/token.interceptor';
import { errorInterceptor } from './api/Interceptor/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      tokenInterceptor,errorInterceptor
    ])),
  ]
};

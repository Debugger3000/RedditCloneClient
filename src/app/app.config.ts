import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// export function initApp(generalService: GeneralService) {
//   return () => generalService.initUser();
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    // Modern async initializer (no APP_INITIALIZER)
    // {
    //   provide: 'APP_INIT',
    //   useFactory: (generalService: GeneralService) => {
    //     return async () => {
    //       await generalService.initUser();
    //     };
    //   },
    //   deps: [GeneralService],
    // },
  ],
};

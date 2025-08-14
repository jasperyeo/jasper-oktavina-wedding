import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { THEME_PRESET } from './app.constants';

const rosePreset = definePreset(Aura, THEME_PRESET);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    provideRouter(routes),
    provideAnimationsAsync(),
      providePrimeNG({
        theme: {
          preset: rosePreset,
          options: {
            prefix: 'p',
            // darkModeSelector: 'system',
            darkModeSelector: false || 'none',
            cssLayer: false
          }
        },
        ripple: true
      })
  ]
};

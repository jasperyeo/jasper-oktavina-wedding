import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { THEME_PRESET } from './app.constants';

const rosePreset = definePreset(Aura, THEME_PRESET);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })),
    providePrimeNG({
      theme: {
        preset: rosePreset,
        options: {
          prefix: 'p',
          darkModeSelector: 'none',
          cssLayer: false
        }
      },
      ripple: true
    })
  ]
};

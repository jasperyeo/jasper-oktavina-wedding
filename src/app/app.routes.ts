import { Routes } from '@angular/router';
import { DEFAULT_COUNTRY } from './app.constants';

export const routes: Routes = [
  {
    path: ':country',
    loadComponent: () => import('./pages/content-page/content-page').then(m => m.ContentPage)
  },
  { path: '**', redirectTo: DEFAULT_COUNTRY }
];

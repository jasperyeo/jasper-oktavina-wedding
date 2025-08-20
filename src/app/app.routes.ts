import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':country',
    loadComponent: () => import('./pages/content-page/content-page').then(m => m.ContentPage)
  },
  { path: '**', redirectTo: 'id' }
];

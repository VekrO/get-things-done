import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./core/auth/auth.layout').then(m => m.AuthLayout),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/auth/auth.routes').then(m => m.AUTH_ROUTES),
      },
    ],
  },
];

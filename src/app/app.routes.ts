import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./domain/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./domain/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
];

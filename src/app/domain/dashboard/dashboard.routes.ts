import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
  },
];

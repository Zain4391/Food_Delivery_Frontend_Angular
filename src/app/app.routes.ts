import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/signup-user/signup-user/signup-user').then((m) => m.SignupUser),
  },
  {
    path: 'signup-driver',
    loadComponent: () =>
      import('./features/signup-driver/signup-driver').then((m) => m.SignupDriver),
  },
  {
    path: 'signup-admin',
    loadComponent: () =>
      import('./features/signup-admin/signup-admin').then((m) => m.SignupAdmin),
  },
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
];

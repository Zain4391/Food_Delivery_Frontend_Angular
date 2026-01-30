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
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
];

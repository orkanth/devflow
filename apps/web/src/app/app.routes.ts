import { Route } from '@angular/router';
import { shellRoutes } from '@devflow/web-feature-shell';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@devflow/web-feature-auth').then((m) => m.authRoutes),
  },
  {
    path: '',
    children: shellRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

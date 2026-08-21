import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@devflow/web-feature-shell').then((m) => m.shellRoutes),
  },
];

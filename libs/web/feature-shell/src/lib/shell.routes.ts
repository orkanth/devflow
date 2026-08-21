import { Route } from '@angular/router';
import { ShellLayoutComponent } from './layout/shell-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page.component';

export const shellRoutes: Route[] = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      {
        path: 'projects',
        loadChildren: () =>
          import('@devflow/web-feature-projects').then((m) => m.projectsRoutes),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('@devflow/web-feature-tasks').then((m) => m.tasksRoutes),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@devflow/web-feature-users').then((m) => m.usersRoutes),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

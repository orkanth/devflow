import { Route } from '@angular/router';
import { ShellLayoutComponent } from './layout/shell-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { ProjectsPageComponent } from './pages/projects-page.component';
import { TasksPageComponent } from './pages/tasks-page.component';

export const shellRoutes: Route[] = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'projects', component: ProjectsPageComponent },
      { path: 'tasks', component: TasksPageComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

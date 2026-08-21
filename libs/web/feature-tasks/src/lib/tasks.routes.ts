import { Route } from '@angular/router';
import { TasksPageComponent } from './pages/tasks-page.component';

export const tasksRoutes: Route[] = [
  {
    path: '',
    component: TasksPageComponent,
  },
];

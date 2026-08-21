import { Route } from '@angular/router';
import { ProjectListComponent } from './components/project-list.component';

export const projectsRoutes: Route[] = [
  {
    path: '',
    component: ProjectListComponent,
  },
];

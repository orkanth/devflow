import { Route } from '@angular/router';
import { UserListComponent } from './components/user-list.component';

export const usersRoutes: Route[] = [
  {
    path: '',
    component: UserListComponent,
  },
];

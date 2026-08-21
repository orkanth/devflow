import { Route } from '@angular/router';
import { guestGuard } from './guards/auth.guards';
import { LoginPageComponent } from './pages/login-page.component';

export const authRoutes: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [guestGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

import { Injectable } from '@angular/core';
import { AuthSession, LoginCredentials, User } from '@devflow/shared-types';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_USERS } from '../users/mock-users.data';
import { MOCK_DEMO_PASSWORD } from './auth.constants';
import { AuthDataService } from './auth-data.service';

@Injectable()
export class MockAuthService extends AuthDataService {
  login(credentials: LoginCredentials): Observable<AuthSession> {
    const email = credentials.email.trim().toLowerCase();
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email);

    if (!user || credentials.password !== MOCK_DEMO_PASSWORD) {
      return throwError(() => new Error('Invalid email or password'));
    }

    return of({
      user,
      token: createMockJwt(user),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    }).pipe(delay(600));
  }
}

function createMockJwt(user: User): string {
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Date.now(),
    }),
  );
  return `mock.${payload}.devflow`;
}

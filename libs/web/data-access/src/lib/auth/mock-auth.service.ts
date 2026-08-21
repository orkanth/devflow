import { Injectable } from '@angular/core';
import {
  AuthSession,
  LoginCredentials,
  OAuthProvider,
  User,
} from '@devflow/shared-types';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_USERS } from '../users/mock-users.data';
import { MOCK_DEMO_PASSWORD } from './auth.constants';
import { AuthDataService } from './auth-data.service';

const PROVIDER_DEMO_USERS: Record<OAuthProvider, string> = {
  google: 'alex@devflow.dev',
  microsoft: 'sarah@devflow.dev',
};

@Injectable()
export class MockAuthService extends AuthDataService {
  login(credentials: LoginCredentials): Observable<AuthSession> {
    const email = credentials.email.trim().toLowerCase();
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email);

    if (!user || credentials.password !== MOCK_DEMO_PASSWORD) {
      return throwError(() => new Error('Invalid email or password'));
    }

    return of(this.createSession(user)).pipe(delay(600));
  }

  loginWithProvider(provider: OAuthProvider): Observable<AuthSession> {
    const email = PROVIDER_DEMO_USERS[provider];
    const user = MOCK_USERS.find((u) => u.email === email);

    if (!user) {
      return throwError(() => new Error('OAuth sign-in failed'));
    }

    return of(this.createSession(user, provider)).pipe(delay(900));
  }

  private createSession(user: User, provider?: OAuthProvider): AuthSession {
    return {
      user,
      token: createMockJwt(user, provider),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      provider: provider ?? 'email',
    };
  }
}

function createMockJwt(user: User, provider?: OAuthProvider): string {
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      provider: provider ?? 'email',
      iat: Date.now(),
    }),
  );
  return `mock.${payload}.devflow`;
}

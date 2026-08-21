import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AuthSignInMethod,
  LoginCredentials,
  OAuthProvider,
  User,
} from '@devflow/shared-types';
import { firstValueFrom } from 'rxjs';
import { MOCK_USERS } from '../users/mock-users.data';
import { UserStore } from '../users/user.store';
import {
  AUTH_PROVIDER_KEY,
  AUTH_TOKEN_KEY,
  AUTH_USER_ID_KEY,
  MOCK_DEMO_PASSWORD,
} from './auth.constants';
import { AuthDataService } from './auth-data.service';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly authService = inject(AuthDataService);
  private readonly userStore = inject(UserStore);

  private readonly userId = signal<string | null>(null);
  private readonly token = signal<string | null>(null);
  private readonly signInMethod = signal<AuthSignInMethod | null>(null);
  private readonly authError = signal<string | null>(null);
  private readonly authLoading = signal(false);
  private initialized = false;

  readonly currentUserId = computed(() => this.userId());
  readonly accessToken = computed(() => this.token());
  readonly authProvider = computed(() => this.signInMethod());
  readonly error = computed(() => this.authError());
  readonly loading = computed(() => this.authLoading());

  readonly currentUser = computed(() => {
    const id = this.userId();
    if (!id) {
      return null;
    }
    const fromStore = this.userStore.usersById().get(id);
    if (fromStore) {
      return fromStore;
    }
    return MOCK_USERS.find((user) => user.id === id) ?? null;
  });

  readonly isAuthenticated = computed(
    () => !!this.token() && !!this.currentUser(),
  );

  readonly demoPassword = MOCK_DEMO_PASSWORD;

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    await this.userStore.loadUsers();

    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUserId = localStorage.getItem(AUTH_USER_ID_KEY);
    const storedProvider = localStorage.getItem(
      AUTH_PROVIDER_KEY,
    ) as AuthSignInMethod | null;

    if (storedToken && storedUserId) {
      this.token.set(storedToken);
      this.userId.set(storedUserId);
      this.signInMethod.set(
        storedProvider ?? parseProviderFromToken(storedToken) ?? 'email',
      );
    }
  }

  async login(credentials: LoginCredentials): Promise<boolean> {
    this.authLoading.set(true);
    this.authError.set(null);
    try {
      const session = await firstValueFrom(this.authService.login(credentials));
      this.persistSession(session);
      this.authLoading.set(false);
      return true;
    } catch {
      this.authError.set('Invalid email or password. Please try again.');
      this.authLoading.set(false);
      return false;
    }
  }

  async loginAsDemoUser(user: User): Promise<boolean> {
    return this.login({ email: user.email, password: MOCK_DEMO_PASSWORD });
  }

  async loginWithProvider(provider: OAuthProvider): Promise<boolean> {
    this.authLoading.set(true);
    this.authError.set(null);
    try {
      const session = await firstValueFrom(
        this.authService.loginWithProvider(provider),
      );
      this.persistSession(session);
      this.authLoading.set(false);
      return true;
    } catch {
      this.authError.set(
        'Social sign-in failed. Try again or use your email and password.',
      );
      this.authLoading.set(false);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_ID_KEY);
    localStorage.removeItem(AUTH_PROVIDER_KEY);
    this.token.set(null);
    this.userId.set(null);
    this.signInMethod.set(null);
    this.authError.set(null);
  }

  clearError(): void {
    this.authError.set(null);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  private persistSession(session: {
    user: User;
    token: string;
    provider?: AuthSignInMethod;
  }): void {
    const provider =
      session.provider ?? parseProviderFromToken(session.token) ?? 'email';

    localStorage.setItem(AUTH_TOKEN_KEY, session.token);
    localStorage.setItem(AUTH_USER_ID_KEY, session.user.id);
    localStorage.setItem(AUTH_PROVIDER_KEY, provider);
    this.token.set(session.token);
    this.userId.set(session.user.id);
    this.signInMethod.set(provider);
  }
}

function parseProviderFromToken(token: string): AuthSignInMethod | null {
  try {
    const payloadPart = token.split('.')[1];
    if (!payloadPart) {
      return null;
    }
    const payload = JSON.parse(atob(payloadPart)) as { provider?: AuthSignInMethod };
    return payload.provider ?? null;
  } catch {
    return null;
  }
}

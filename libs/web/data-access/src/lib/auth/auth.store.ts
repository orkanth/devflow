import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@devflow/shared-types';
import { MOCK_USERS } from '../users/mock-users.data';
import { UserStore } from '../users/user.store';

export const DEFAULT_CURRENT_USER_ID = 'user-1';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly userStore = inject(UserStore);
  private readonly userId = signal(DEFAULT_CURRENT_USER_ID);

  readonly currentUserId = computed(() => this.userId());

  readonly currentUser = computed(() => {
    const id = this.userId();
    const fromStore = this.userStore.usersById().get(id);
    if (fromStore) {
      return fromStore;
    }
    return MOCK_USERS.find((user) => user.id === id) ?? null;
  });

  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  async initialize(): Promise<void> {
    await this.userStore.loadUsers();
  }

  setCurrentUser(userId: string): void {
    this.userId.set(userId);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }
}

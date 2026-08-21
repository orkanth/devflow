import { computed, inject, Injectable, signal } from '@angular/core';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
} from '@devflow/shared-types';
import { firstValueFrom } from 'rxjs';
import { UserDataService } from './user-data.service';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  searchQuery: '',
};

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly userService = inject(UserDataService);
  private readonly state = signal<UserState>(initialState);

  readonly users = computed(() => this.state().users);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly searchQuery = computed(() => this.state().searchQuery);

  readonly filteredUsers = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const list = this.users();
    if (!query) {
      return list;
    }
    return list.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );
  });

  readonly usersById = computed(
    () => new Map(this.users().map((user) => [user.id, user])),
  );

  setSearchQuery(query: string): void {
    this.patch({ searchQuery: query });
  }

  getUserName(id?: string | null): string {
    if (!id) {
      return 'Unassigned';
    }
    return this.usersById().get(id)?.name ?? 'Unknown';
  }

  async loadUsers(): Promise<void> {
    if (this.users().length > 0) {
      return;
    }
    this.patch({ loading: true, error: null });
    try {
      const users = await firstValueFrom(this.userService.getAll());
      this.patch({ users, loading: false });
    } catch {
      this.patch({
        loading: false,
        error: 'Failed to load users. Please try again.',
      });
    }
  }

  async reloadUsers(): Promise<void> {
    this.patch({ loading: true, error: null });
    try {
      const users = await firstValueFrom(this.userService.getAll());
      this.patch({ users, loading: false });
    } catch {
      this.patch({
        loading: false,
        error: 'Failed to load users. Please try again.',
      });
    }
  }

  async createUser(data: CreateUserDto): Promise<boolean> {
    this.patch({ loading: true, error: null });
    try {
      const user = await firstValueFrom(this.userService.create(data));
      this.patch({
        users: [user, ...this.users()],
        loading: false,
      });
      return true;
    } catch {
      this.patch({ loading: false, error: 'Failed to create user.' });
      return false;
    }
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<boolean> {
    this.patch({ loading: true, error: null });
    try {
      const updated = await firstValueFrom(this.userService.update(id, data));
      this.patch({
        users: this.users().map((u) => (u.id === id ? updated : u)),
        loading: false,
      });
      return true;
    } catch {
      this.patch({ loading: false, error: 'Failed to update user.' });
      return false;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    this.patch({ loading: true, error: null });
    try {
      await firstValueFrom(this.userService.delete(id));
      this.patch({
        users: this.users().filter((u) => u.id !== id),
        loading: false,
      });
      return true;
    } catch {
      this.patch({ loading: false, error: 'Failed to delete user.' });
      return false;
    }
  }

  clearError(): void {
    this.patch({ error: null });
  }

  private patch(partial: Partial<UserState>): void {
    this.state.update((current) => ({ ...current, ...partial }));
  }
}

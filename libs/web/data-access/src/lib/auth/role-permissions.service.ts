import { computed, inject, Injectable } from '@angular/core';
import { User, UserRole } from '@devflow/shared-types';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class RolePermissionsService {
  private readonly authStore = inject(AuthStore);

  readonly role = computed(() => this.authStore.currentUser()?.role ?? null);
  readonly currentUserId = computed(() => this.authStore.currentUserId());

  readonly isAdmin = computed(() => this.role() === 'admin');
  readonly isMember = computed(() => this.role() === 'member');
  readonly isViewer = computed(() => this.role() === 'viewer');

  readonly canManageUsers = computed(() => this.isAdmin());
  readonly canManageProjects = computed(() => this.isAdmin());
  readonly canCreateTasks = computed(() => this.isAdmin() || this.isMember());
  readonly canEditTasks = computed(() => this.isAdmin() || this.isMember());
  readonly canDeleteTasks = computed(() => this.isAdmin() || this.isMember());
  readonly canAssignTasksToAnyone = computed(() => this.isAdmin());

  canAssignTaskTo(assigneeId: string | null | undefined): boolean {
    if (this.isViewer()) {
      return false;
    }
    if (this.isAdmin()) {
      return true;
    }
    if (this.isMember()) {
      const userId = this.currentUserId();
      return !assigneeId || assigneeId === userId;
    }
    return false;
  }

  assignableUsers(users: User[]): User[] {
    if (this.canAssignTasksToAnyone()) {
      return users;
    }
    const userId = this.currentUserId();
    if (!userId) {
      return [];
    }
    return users.filter((user) => user.id === userId);
  }

  roleLabel(role: UserRole | null): string {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'member':
        return 'Member';
      case 'viewer':
        return 'Viewer';
      default:
        return 'User';
    }
  }
}

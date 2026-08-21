import { computed, inject, Injectable } from '@angular/core';
import { User, UserRole } from '@devflow/shared-types';
import { AuthStore } from './auth.store';
import {
  assignableUsers as filterAssignableUsers,
  canAssignTaskTo as canAssignTaskToRole,
  canAssignTasksToAnyone,
  canCreateTasks,
  canDeleteTasks,
  canEditTasks,
  canManageProjects,
  canManageUsers,
  roleLabel as formatRoleLabel,
} from './role-permissions.util';

@Injectable({ providedIn: 'root' })
export class RolePermissionsService {
  private readonly authStore = inject(AuthStore);

  readonly role = computed(() => this.authStore.currentUser()?.role ?? null);
  readonly currentUserId = computed(() => this.authStore.currentUserId());

  readonly isAdmin = computed(() => this.role() === 'admin');
  readonly isMember = computed(() => this.role() === 'member');
  readonly isViewer = computed(() => this.role() === 'viewer');

  readonly canManageUsers = computed(() => canManageUsers(this.role()));
  readonly canManageProjects = computed(() => canManageProjects(this.role()));
  readonly canCreateTasks = computed(() => canCreateTasks(this.role()));
  readonly canEditTasks = computed(() => canEditTasks(this.role()));
  readonly canDeleteTasks = computed(() => canDeleteTasks(this.role()));
  readonly canAssignTasksToAnyone = computed(() =>
    canAssignTasksToAnyone(this.role()),
  );

  canAssignTaskTo(assigneeId: string | null | undefined): boolean {
    return canAssignTaskToRole(
      this.role(),
      this.currentUserId(),
      assigneeId,
    );
  }

  assignableUsers(users: User[]): User[] {
    return filterAssignableUsers(
      this.role(),
      this.currentUserId(),
      users,
    );
  }

  roleLabel(role: UserRole | null): string {
    return formatRoleLabel(role);
  }
}

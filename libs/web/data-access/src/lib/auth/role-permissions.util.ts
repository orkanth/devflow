import { User, UserRole } from '@devflow/shared-types';

export function canManageUsers(role: UserRole | null | undefined): boolean {
  return role === 'admin';
}

export function canManageProjects(role: UserRole | null | undefined): boolean {
  return role === 'admin';
}

export function canCreateTasks(role: UserRole | null | undefined): boolean {
  return role === 'admin' || role === 'member';
}

export function canEditTasks(role: UserRole | null | undefined): boolean {
  return role === 'admin' || role === 'member';
}

export function canDeleteTasks(role: UserRole | null | undefined): boolean {
  return role === 'admin' || role === 'member';
}

export function canAssignTasksToAnyone(role: UserRole | null | undefined): boolean {
  return role === 'admin';
}

export function canAssignTaskTo(
  role: UserRole | null | undefined,
  currentUserId: string | null,
  assigneeId: string | null | undefined,
): boolean {
  if (role === 'viewer' || !role) {
    return false;
  }
  if (role === 'admin') {
    return true;
  }
  if (role === 'member') {
    return !assigneeId || assigneeId === currentUserId;
  }
  return false;
}

export function assignableUsers(
  role: UserRole | null | undefined,
  currentUserId: string | null,
  users: User[],
): User[] {
  if (canAssignTasksToAnyone(role)) {
    return users;
  }
  if (!currentUserId) {
    return [];
  }
  return users.filter((user) => user.id === currentUserId);
}

export function roleLabel(role: UserRole | null | undefined): string {
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

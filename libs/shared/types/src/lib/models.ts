export type UserRole = 'admin' | 'member' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type ProjectStatus = 'active' | 'archived';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  ownerId: string;
  createdAt: Date;
}

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  dueDate?: Date;
}

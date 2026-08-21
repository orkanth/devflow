import { User, UserRole } from '@devflow/shared-types';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alex Chen',
    email: 'alex@devflow.dev',
    role: 'admin',
  },
  {
    id: 'user-2',
    name: 'Sarah Miller',
    email: 'sarah@devflow.dev',
    role: 'member',
  },
  {
    id: 'user-3',
    name: 'James Wilson',
    email: 'james@devflow.dev',
    role: 'member',
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily@devflow.dev',
    role: 'viewer',
  },
];

export const DEFAULT_USER_ROLE: UserRole = 'member';

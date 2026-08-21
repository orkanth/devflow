import { Project, ProjectStatus } from '@devflow/shared-types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'DevFlow Platform',
    description: 'Core portfolio project — project & task management',
    status: 'active',
    ownerId: 'user-1',
    createdAt: new Date('2026-01-10'),
  },
  {
    id: 'proj-2',
    name: 'Mobile App Redesign',
    description: 'Refresh the customer mobile experience',
    status: 'active',
    ownerId: 'user-1',
    createdAt: new Date('2026-01-22'),
  },
  {
    id: 'proj-3',
    name: 'API Gateway Migration',
    description: 'Move legacy services behind a unified gateway',
    status: 'active',
    ownerId: 'user-2',
    createdAt: new Date('2026-02-05'),
  },
  {
    id: 'proj-4',
    name: 'Q4 Marketing Site',
    description: 'Landing pages and campaign microsites',
    status: 'archived',
    ownerId: 'user-3',
    createdAt: new Date('2025-10-01'),
  },
  {
    id: 'proj-5',
    name: 'Internal Tools Suite',
    description: 'Admin dashboards for operations team',
    status: 'active',
    ownerId: 'user-1',
    createdAt: new Date('2026-02-18'),
  },
  {
    id: 'proj-6',
    name: 'Legacy CRM Sunset',
    description: 'Decommission old CRM and migrate data',
    status: 'archived',
    ownerId: 'user-2',
    createdAt: new Date('2025-08-15'),
  },
];

export const DEFAULT_PROJECT_STATUS: ProjectStatus = 'active';
export const MOCK_OWNER_ID = 'user-1';

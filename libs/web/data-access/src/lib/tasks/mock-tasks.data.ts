import { Task, TaskPriority, TaskStatus } from '@devflow/shared-types';

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    title: 'Set up Nx monorepo',
    description: 'Angular + NestJS workspace scaffolding',
    status: 'done',
    priority: 'high',
    dueDate: new Date('2026-02-01'),
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    title: 'Implement app shell',
    description: 'Material sidenav, header, routing',
    status: 'done',
    priority: 'high',
  },
  {
    id: 'task-3',
    projectId: 'proj-1',
    title: 'Build Projects feature',
    description: 'Signal store + Material table + CRUD',
    status: 'done',
    priority: 'medium',
  },
  {
    id: 'task-4',
    projectId: 'proj-1',
    title: 'Build Tasks Kanban board',
    description: 'CDK drag-drop between columns',
    status: 'in_progress',
    priority: 'high',
  },
  {
    id: 'task-5',
    projectId: 'proj-1',
    title: 'Add dashboard widgets',
    status: 'todo',
    priority: 'medium',
  },
  {
    id: 'task-6',
    projectId: 'proj-2',
    title: 'Audit current mobile screens',
    status: 'in_progress',
    priority: 'medium',
    dueDate: new Date('2026-03-15'),
  },
  {
    id: 'task-7',
    projectId: 'proj-2',
    title: 'Design new navigation pattern',
    status: 'todo',
    priority: 'high',
  },
  {
    id: 'task-8',
    projectId: 'proj-3',
    title: 'Map legacy API endpoints',
    status: 'todo',
    priority: 'low',
  },
  {
    id: 'task-9',
    projectId: 'proj-3',
    title: 'Configure API gateway routes',
    status: 'in_progress',
    priority: 'high',
  },
  {
    id: 'task-10',
    projectId: 'proj-5',
    title: 'Ops dashboard wireframes',
    status: 'todo',
    priority: 'medium',
  },
  {
    id: 'task-11',
    projectId: 'proj-5',
    title: 'Role-based access UI',
    status: 'todo',
    priority: 'high',
  },
  {
    id: 'task-12',
    projectId: 'proj-2',
    title: 'Prototype onboarding flow',
    status: 'done',
    priority: 'low',
  },
];

export const DEFAULT_TASK_STATUS: TaskStatus = 'todo';
export const DEFAULT_TASK_PRIORITY: TaskPriority = 'medium';

import { computed, inject, Injectable, signal } from '@angular/core';
import {
  CreateTaskDto,
  Task,
  TaskStatus,
  TASK_STATUSES,
  UpdateTaskDto,
} from '@devflow/shared-types';
import { firstValueFrom } from 'rxjs';
import { TaskDataService } from './task-data.service';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filterProjectId: string | null;
  filterAssigneeId: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  searchQuery: '',
  filterProjectId: null,
  filterAssigneeId: null,
};

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly taskService = inject(TaskDataService);
  private readonly state = signal<TaskState>(initialState);

  readonly tasks = computed(() => this.state().tasks);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly searchQuery = computed(() => this.state().searchQuery);
  readonly filterProjectId = computed(() => this.state().filterProjectId);
  readonly filterAssigneeId = computed(() => this.state().filterAssigneeId);

  readonly visibleTasks = computed(() => {
    let list = this.tasks();
    const projectId = this.filterProjectId();
    const assigneeId = this.filterAssigneeId();
    const query = this.searchQuery().trim().toLowerCase();

    if (projectId) {
      list = list.filter((task) => task.projectId === projectId);
    }

    if (assigneeId === '__unassigned__') {
      list = list.filter((task) => !task.assigneeId);
    } else if (assigneeId) {
      list = list.filter((task) => task.assigneeId === assigneeId);
    }

    if (query) {
      list = list.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query),
      );
    }

    return list;
  });

  readonly todoTasks = computed(() =>
    this.visibleTasks().filter((t) => t.status === 'todo'),
  );

  readonly inProgressTasks = computed(() =>
    this.visibleTasks().filter((t) => t.status === 'in_progress'),
  );

  readonly doneTasks = computed(() =>
    this.visibleTasks().filter((t) => t.status === 'done'),
  );

  readonly statusCounts = computed(() => ({
    todo: this.todoTasks().length,
    in_progress: this.inProgressTasks().length,
    done: this.doneTasks().length,
    total: this.visibleTasks().length,
  }));

  tasksForStatus(status: TaskStatus): Task[] {
    switch (status) {
      case 'todo':
        return this.todoTasks();
      case 'in_progress':
        return this.inProgressTasks();
      case 'done':
        return this.doneTasks();
    }
  }

  setSearchQuery(query: string): void {
    this.patch({ searchQuery: query });
  }

  setFilterProjectId(projectId: string | null): void {
    this.patch({ filterProjectId: projectId });
  }

  setFilterAssigneeId(assigneeId: string | null): void {
    this.patch({ filterAssigneeId: assigneeId });
  }

  async loadTasks(): Promise<void> {
    this.patch({ loading: true, error: null });
    try {
      const tasks = await firstValueFrom(this.taskService.getAll());
      this.patch({ tasks, loading: false });
    } catch {
      this.patch({
        loading: false,
        error: 'Failed to load tasks. Please try again.',
      });
    }
  }

  async createTask(data: CreateTaskDto): Promise<boolean> {
    this.patch({ loading: true, error: null });
    try {
      const task = await firstValueFrom(this.taskService.create(data));
      this.patch({
        tasks: [task, ...this.tasks()],
        loading: false,
      });
      return true;
    } catch {
      this.patch({ loading: false, error: 'Failed to create task.' });
      return false;
    }
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<boolean> {
    const previous = this.tasks();
    const optimistic = previous.map((t) => {
      if (t.id !== id) {
        return t;
      }
      const assigneeId =
        data.assigneeId === null
          ? undefined
          : data.assigneeId ?? t.assigneeId;
      return { ...t, ...data, assigneeId };
    });
    this.patch({ tasks: optimistic, error: null });

    try {
      const updated = await firstValueFrom(this.taskService.update(id, data));
      this.patch({
        tasks: previous.map((t) => (t.id === id ? updated : t)),
      });
      return true;
    } catch {
      this.patch({ tasks: previous, error: 'Failed to update task.' });
      return false;
    }
  }

  async moveTask(
    taskId: string,
    newStatus: TaskStatus,
    columnIndex?: number,
  ): Promise<boolean> {
    const previous = this.tasks();
    const task = previous.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) {
      return true;
    }

    return this.updateTask(taskId, { status: newStatus });
  }

  async deleteTask(id: string): Promise<boolean> {
    this.patch({ loading: true, error: null });
    try {
      await firstValueFrom(this.taskService.delete(id));
      this.patch({
        tasks: this.tasks().filter((t) => t.id !== id),
        loading: false,
      });
      return true;
    } catch {
      this.patch({ loading: false, error: 'Failed to delete task.' });
      return false;
    }
  }

  clearError(): void {
    this.patch({ error: null });
  }

  private patch(partial: Partial<TaskState>): void {
    this.state.update((current) => ({ ...current, ...partial }));
  }
}

export const TASK_COLUMNS = TASK_STATUSES;

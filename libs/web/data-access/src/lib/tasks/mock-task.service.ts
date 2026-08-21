import { Injectable } from '@angular/core';
import {
  CreateTaskDto,
  Task,
  UpdateTaskDto,
} from '@devflow/shared-types';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  DEFAULT_TASK_PRIORITY,
  DEFAULT_TASK_STATUS,
  MOCK_TASKS,
} from './mock-tasks.data';
import { TaskDataService } from './task-data.service';

@Injectable()
export class MockTaskService extends TaskDataService {
  private tasks = [...MOCK_TASKS];

  getAll(): Observable<Task[]> {
    return of([...this.tasks]).pipe(delay(400));
  }

  create(data: CreateTaskDto): Observable<Task> {
    const task: Task = {
      id: `task-${Date.now()}`,
      projectId: data.projectId,
      title: data.title.trim(),
      description: data.description?.trim(),
      status: data.status ?? DEFAULT_TASK_STATUS,
      priority: data.priority ?? DEFAULT_TASK_PRIORITY,
      assigneeId: data.assigneeId,
      dueDate: data.dueDate,
    };
    this.tasks = [task, ...this.tasks];
    return of(task).pipe(delay(300));
  }

  update(id: string, data: UpdateTaskDto): Observable<Task> {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return throwError(() => new Error('Task not found'));
    }

    const current = this.tasks[index];
    const updated: Task = {
      ...current,
      ...data,
      title: data.title?.trim() ?? current.title,
      description: data.description?.trim() ?? current.description,
      assigneeId:
        data.assigneeId === null ? undefined : data.assigneeId ?? current.assigneeId,
    };
    this.tasks = [
      ...this.tasks.slice(0, index),
      updated,
      ...this.tasks.slice(index + 1),
    ];
    return of(updated).pipe(delay(250));
  }

  delete(id: string): Observable<void> {
    const exists = this.tasks.some((t) => t.id === id);
    if (!exists) {
      return throwError(() => new Error('Task not found'));
    }
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return of(void 0).pipe(delay(300));
  }
}

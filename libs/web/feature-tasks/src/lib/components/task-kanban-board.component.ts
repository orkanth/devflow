import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { CdkDropListGroup, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task, TaskStatus, TASK_STATUSES } from '@devflow/shared-types';
import { TaskStore } from '@devflow/web-data-access';
import { TaskKanbanColumnComponent } from './task-kanban-column.component';

@Component({
  selector: 'df-task-kanban-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DragDropModule, CdkDropListGroup, TaskKanbanColumnComponent],
  templateUrl: './task-kanban-board.component.html',
  styleUrl: './task-kanban-board.component.scss',
})
export class TaskKanbanBoardComponent {
  private readonly store = inject(TaskStore);

  readonly columns = TASK_STATUSES;
  readonly statusCounts = this.store.statusCounts;

  readonly editTask = output<Task>();
  readonly deleteTask = output<Task>();

  tasksFor(status: TaskStatus): Task[] {
    return this.store.tasksForStatus(status);
  }

  countFor(status: TaskStatus): number {
    return this.statusCounts()[status];
  }

  onDrop(event: CdkDragDrop<TaskStatus>): void {
    const task = event.item.data as Task;
    const targetStatus = event.container.data;

    if (task && task.status !== targetStatus) {
      this.store.moveTask(task.id, targetStatus);
    }
  }

  onEdit(task: Task): void {
    this.editTask.emit(task);
  }

  onDelete(task: Task): void {
    this.deleteTask.emit(task);
  }
}

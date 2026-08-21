import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import {
  Task,
  TaskStatus,
  TASK_STATUS_LABELS,
} from '@devflow/shared-types';
import { TaskCardComponent } from './task-card.component';

@Component({
  selector: 'df-task-kanban-column',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DragDropModule, TaskCardComponent],
  templateUrl: './task-kanban-column.component.html',
  styleUrl: './task-kanban-column.component.scss',
})
export class TaskKanbanColumnComponent {
  readonly status = input.required<TaskStatus>();
  readonly tasks = input.required<Task[]>();
  readonly count = input.required<number>();

  readonly taskDrop = output<CdkDragDrop<TaskStatus>>();
  readonly taskEdit = output<Task>();
  readonly taskDelete = output<Task>();

  label(): string {
    return TASK_STATUS_LABELS[this.status()];
  }
}

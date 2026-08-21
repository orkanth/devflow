import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Task, TASK_STATUS_LABELS } from '@devflow/shared-types';
import { MOCK_PROJECTS, UserStore, TaskStore } from '@devflow/web-data-access';
import { TaskPriorityChipComponent } from './task-priority-chip.component';

@Component({
  selector: 'df-task-list-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TaskPriorityChipComponent,
  ],
  templateUrl: './task-list-view.component.html',
  styleUrl: './task-list-view.component.scss',
})
export class TaskListViewComponent {
  private readonly store = inject(TaskStore);
  private readonly userStore = inject(UserStore);

  readonly tasks = this.store.visibleTasks;

  readonly displayedColumns = [
    'title',
    'project',
    'assignee',
    'status',
    'priority',
    'dueDate',
    'actions',
  ];

  readonly editTask = output<Task>();
  readonly deleteTask = output<Task>();

  projectName(projectId: string): string {
    return MOCK_PROJECTS.find((p) => p.id === projectId)?.name ?? 'Unknown';
  }

  statusLabel(status: Task['status']): string {
    return TASK_STATUS_LABELS[status];
  }

  assigneeName(task: Task): string {
    return this.userStore.getUserName(task.assigneeId);
  }
}

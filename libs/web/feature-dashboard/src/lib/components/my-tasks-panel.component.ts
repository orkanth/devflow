import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DfEmptyStateComponent } from '@devflow/shared-ui';
import { Task, TASK_STATUS_LABELS } from '@devflow/shared-types';
import { MOCK_PROJECTS } from '@devflow/web-data-access';

@Component({
  selector: 'df-my-tasks-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'df-my-tasks-panel' },
  imports: [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    DfEmptyStateComponent,
  ],
  templateUrl: './my-tasks-panel.component.html',
  styleUrl: './my-tasks-panel.component.scss',
})
export class MyTasksPanelComponent {
  readonly tasks = input.required<Task[]>();
  readonly loading = input(false);
  readonly userName = input('');

  readonly viewAll = output<void>();

  statusLabel(status: Task['status']): string {
    return TASK_STATUS_LABELS[status];
  }

  projectName(projectId: string): string {
    return MOCK_PROJECTS.find((p) => p.id === projectId)?.name ?? 'Unknown';
  }

  priorityClass(priority: Task['priority']): string {
    return `priority-chip priority-chip--${priority}`;
  }
}

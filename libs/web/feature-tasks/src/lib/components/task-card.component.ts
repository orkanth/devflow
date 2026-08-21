import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Task } from '@devflow/shared-types';
import { MOCK_PROJECTS } from '@devflow/web-data-access';
import { TaskPriorityChipComponent } from './task-priority-chip.component';

@Component({
  selector: 'df-task-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkDrag,
    CdkDragHandle,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TaskPriorityChipComponent,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  readonly task = input.required<Task>();

  readonly edit = output<Task>();
  readonly delete = output<Task>();

  projectName(task: Task): string {
    return MOCK_PROJECTS.find((p) => p.id === task.projectId)?.name ?? 'Unknown';
  }
}

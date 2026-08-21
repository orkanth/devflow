import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { TaskPriority } from '@devflow/shared-types';

@Component({
  selector: 'df-task-priority-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule],
  template: `
    <mat-chip-set>
      <mat-chip [class]="'priority-chip priority-chip--' + priority()">
        {{ label() }}
      </mat-chip>
    </mat-chip-set>
  `,
  styles: `
    .priority-chip {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .priority-chip--low {
      background: #f1f5f9;
      color: #475569;
    }

    .priority-chip--medium {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .priority-chip--high {
      background: #fee2e2;
      color: #b91c1c;
    }
  `,
})
export class TaskPriorityChipComponent {
  readonly priority = input.required<TaskPriority>();

  label(): string {
    return this.priority();
  }
}

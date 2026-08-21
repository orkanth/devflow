import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ProjectStatus } from '@devflow/shared-types';

@Component({
  selector: 'df-project-status-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule],
  template: `
    <mat-chip-set>
      <mat-chip [class]="'status-chip status-chip--' + status()">
        {{ status() === 'active' ? 'Active' : 'Archived' }}
      </mat-chip>
    </mat-chip-set>
  `,
  styles: `
    .status-chip {
      font-size: 12px;
      font-weight: 500;
    }

    .status-chip--active {
      background: #dcfce7;
      color: #166534;
    }

    .status-chip--archived {
      background: #f1f5f9;
      color: #475569;
    }
  `,
})
export class ProjectStatusChipComponent {
  readonly status = input.required<ProjectStatus>();
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { UserRole, USER_ROLE_LABELS } from '@devflow/shared-types';

@Component({
  selector: 'df-user-role-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule],
  template: `
    <mat-chip-set>
      <mat-chip [class]="'role-chip role-chip--' + role()">
        {{ USER_ROLE_LABELS[role()] }}
      </mat-chip>
    </mat-chip-set>
  `,
  styles: `
    .role-chip {
      font-size: 12px;
      font-weight: 500;
    }

    .role-chip--admin {
      background: #ede9fe;
      color: #5b21b6;
    }

    .role-chip--member {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .role-chip--viewer {
      background: #f1f5f9;
      color: #475569;
    }
  `,
})
export class UserRoleChipComponent {
  readonly role = input.required<UserRole>();
  readonly USER_ROLE_LABELS = USER_ROLE_LABELS;
}

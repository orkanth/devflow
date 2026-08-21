import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateUserDto, User } from '@devflow/shared-types';
import { UserStore } from '@devflow/web-data-access';
import {
  UserFormDialogComponent,
  UserFormDialogResult,
} from './user-form-dialog.component';
import { UserRoleChipComponent } from './user-role-chip.component';

@Component({
  selector: 'df-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule,
    UserRoleChipComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private readonly store = inject(UserStore);
  private readonly dialog = inject(MatDialog);

  readonly users = this.store.filteredUsers;
  readonly loading = this.store.loading;
  readonly error = this.store.error;

  readonly searchInput = signal('');

  readonly displayedColumns = ['name', 'email', 'role', 'actions'];

  ngOnInit(): void {
    this.store.reloadUsers();
  }

  onSearch(value: string): void {
    this.searchInput.set(value);
    this.store.setSearchQuery(value);
  }

  openCreateDialog(): void {
    const ref = this.dialog.open(UserFormDialogComponent, {
      width: '480px',
      maxWidth: '95vw',
      data: {},
    });

    ref.afterClosed().subscribe((result?: UserFormDialogResult) => {
      if (result?.mode === 'create') {
        this.store.createUser(result.data as CreateUserDto);
      }
    });
  }

  openEditDialog(user: User): void {
    const ref = this.dialog.open(UserFormDialogComponent, {
      width: '480px',
      maxWidth: '95vw',
      data: { user },
    });

    ref.afterClosed().subscribe((result?: UserFormDialogResult) => {
      if (result?.mode === 'update') {
        this.store.updateUser(user.id, result.data);
      }
    });
  }

  async deleteUser(user: User): Promise<void> {
    const confirmed = confirm(`Delete "${user.name}"?`);
    if (confirmed) {
      await this.store.deleteUser(user.id);
    }
  }

  dismissError(): void {
    this.store.clearError();
  }
}

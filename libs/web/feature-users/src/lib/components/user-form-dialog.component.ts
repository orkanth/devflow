import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  CreateUserDto,
  User,
  UserRole,
  UpdateUserDto,
  USER_ROLES,
} from '@devflow/shared-types';

export interface UserFormDialogData {
  user?: User;
}

export interface UserFormDialogResult {
  mode: 'create' | 'update';
  data: CreateUserDto | UpdateUserDto;
}

@Component({
  selector: 'df-user-form-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss',
})
export class UserFormDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<UserFormDialogComponent>);
  private readonly data = inject<UserFormDialogData>(MAT_DIALOG_DATA, {
    optional: true,
  }) ?? {};
  private readonly fb = inject(FormBuilder);

  readonly roles = USER_ROLES;
  readonly isEdit = !!this.data.user;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['member' as UserRole, Validators.required],
  });

  ngOnInit(): void {
    if (this.data.user) {
      this.form.setValue({
        name: this.data.user.name,
        email: this.data.user.email,
        role: this.data.user.role,
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      mode: this.isEdit ? 'update' : 'create',
      data: this.form.getRawValue(),
    } satisfies UserFormDialogResult);
  }
}

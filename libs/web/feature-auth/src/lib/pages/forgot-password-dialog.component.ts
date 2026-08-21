import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'df-forgot-password-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  template: `
    <div class="forgot-dialog">
      <div class="forgot-dialog__icon-wrap">
        <mat-icon>lock_reset</mat-icon>
      </div>
      <h2 mat-dialog-title>Reset your password</h2>
      <mat-dialog-content>
        <p class="forgot-dialog__text">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" autocomplete="email" />
            @if (form.controls.email.touched && form.controls.email.hasError('required')) {
              <mat-error>Email is required</mat-error>
            }
            @if (form.controls.email.touched && form.controls.email.hasError('email')) {
              <mat-error>Enter a valid email</mat-error>
            }
          </mat-form-field>
        </form>
        @if (sent()) {
          <p class="forgot-dialog__success" role="status">
            If an account exists for that email, a reset link has been sent.
          </p>
        }
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="close()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          type="button"
          [disabled]="sent()"
          (click)="submit()"
        >
          {{ sent() ? 'Email sent' : 'Send reset link' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: `
    .forgot-dialog__icon-wrap {
      display: flex;
      justify-content: center;
      margin-bottom: 8px;

      mat-icon {
        width: 48px;
        height: 48px;
        font-size: 48px;
        color: #2563eb;
      }
    }

    h2 {
      text-align: center;
      margin: 0;
      font-weight: 500;
    }

    .forgot-dialog__text {
      margin: 0 0 16px;
      color: #64748b;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .forgot-dialog__success {
      margin: 0;
      padding: 12px;
      border-radius: 8px;
      background: #ecfdf5;
      color: #047857;
      font-size: 0.8125rem;
      line-height: 1.5;
    }

    .full-width {
      width: 100%;
    }
  `,
})
export class ForgotPasswordDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ForgotPasswordDialogComponent>);
  private readonly fb = inject(FormBuilder);

  readonly sent = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sent.set(true);
  }
}

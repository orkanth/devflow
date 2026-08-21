import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OAuthProvider } from '@devflow/shared-types';
import { firstValueFrom } from 'rxjs';
import { OAuthDemoDialogComponent } from '../oauth/oauth-demo-dialog.component';
import { OAUTH_DEMO_PROVIDERS } from '../oauth/oauth-demo.constants';
import { AuthStore } from '@devflow/web-data-access';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog.component';

@Component({
  selector: 'df-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly fb = inject(FormBuilder);

  readonly loading = this.authStore.loading;
  readonly error = this.authStore.error;
  readonly hidePassword = signal(true);
  readonly activeProvider = signal<OAuthProvider | null>(null);

  readonly oauthProviders = Object.values(OAUTH_DEMO_PROVIDERS);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isProviderLoading(provider: OAuthProvider): boolean {
    return this.loading() && this.activeProvider() === provider;
  }

  togglePassword(): void {
    this.hidePassword.update((v) => !v);
  }

  openForgotPassword(): void {
    this.dialog.open(ForgotPasswordDialogComponent, {
      width: '400px',
      maxWidth: '95vw',
    });
  }

  async startOAuthDemo(provider: OAuthProvider): Promise<void> {
    if (this.loading()) {
      return;
    }

    this.authStore.clearError();

    const ref = this.dialog.open(OAuthDemoDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      data: { provider },
      panelClass: 'oauth-demo-dialog-panel',
    });

    const result = await firstValueFrom(ref.afterClosed());
    if (!result?.confirmed) {
      return;
    }

    this.activeProvider.set(provider);
    const success = await this.authStore.loginWithProvider(provider);
    this.activeProvider.set(null);

    if (success) {
      await this.router.navigate(['/dashboard']);
    }
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.activeProvider.set(null);
    const success = await this.authStore.login(this.form.getRawValue());
    if (success) {
      await this.router.navigate(['/dashboard']);
    }
  }
}

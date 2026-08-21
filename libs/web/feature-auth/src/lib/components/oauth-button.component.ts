import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OAuthProvider } from '@devflow/shared-types';

@Component({
  selector: 'df-oauth-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatProgressSpinnerModule],
  template: `
    <button
      mat-stroked-button
      type="button"
      class="oauth-btn"
      [class.oauth-btn--google]="provider() === 'google'"
      [class.oauth-btn--microsoft]="provider() === 'microsoft'"
      [disabled]="disabled() || loading()"
      (click)="pressed.emit()"
    >
      @if (loading()) {
        <mat-spinner diameter="20" />
      } @else {
        <span
          class="oauth-btn__icon"
          [class.oauth-btn__icon--google]="provider() === 'google'"
          [class.oauth-btn__icon--microsoft]="provider() === 'microsoft'"
          aria-hidden="true"
        ></span>
      }
      <span class="oauth-btn__label">
        {{ provider() === 'google' ? 'Sign in with Google (Gmail)' : 'Sign in with Microsoft' }}
      </span>
    </button>
  `,
  styles: `
    .oauth-btn {
      width: 100%;
      height: 48px;
      justify-content: center;
      gap: 10px;
      border-radius: 10px;
      font-weight: 500;
      border-color: #e2e8f0;
      color: #0f172a;
      transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
    }

    .oauth-btn--google:hover:not(:disabled) {
      border-color: #93c5fd;
      background: #f8fafc;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
    }

    .oauth-btn--microsoft:hover:not(:disabled) {
      border-color: #7dd3fc;
      background: #f8fafc;
      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.08);
    }

    .oauth-btn__icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .oauth-btn__icon--google {
      background:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23EA4335' d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 9.42 17.74 6.5 24 6.5z'/%3E%3Cpath fill='%234285F4' d='M46.1 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.42c-.53 2.5-2.14 4.64-4.18 6.08l6.19 7.98C43.98 37.99 48 30.92 48 24c0-.67-.02-1.33-.06-1.95z'/%3E%3Cpath fill='%23FBBC05' d='M10.04 28.28A14.5 14.5 0 0 1 9.5 24c0-1.52.28-3 .77-4.28l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.77.9 7.33 2.5 10.47l7.54-5.8z'/%3E%3Cpath fill='%2334A853' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-6.19-7.98c-1.71 1.15-3.9 1.83-6.7 1.83-5.38 0-9.94-3.63-11.53-8.55l-7.98 6.19C6.51 42.62 14.62 48 24 48z'/%3E%3C/svg%3E")
        center / contain no-repeat;
    }

    .oauth-btn__icon--microsoft {
      background:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23 23'%3E%3Cpath fill='%23f25022' d='M1 1h10v10H1z'/%3E%3Cpath fill='%2300a4ef' d='M12 1h10v10H12z'/%3E%3Cpath fill='%237fba00' d='M1 12h10v10H1z'/%3E%3Cpath fill='%23ffb900' d='M12 12h10v10H12z'/%3E%3C/svg%3E")
        center / contain no-repeat;
    }

    .oauth-btn__label {
      font-size: 0.9375rem;
    }
  `,
})
export class OAuthButtonComponent {
  readonly provider = input.required<OAuthProvider>();
  readonly loading = input(false);
  readonly disabled = input(false);

  readonly pressed = output<void>();
}

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DfButtonComponent } from '../button/df-button.component';

@Component({
  selector: 'df-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, DfButtonComponent],
  template: `
    <div class="df-empty-state">
      <mat-icon class="df-empty-state__icon">{{ icon() }}</mat-icon>
      <h3 class="df-empty-state__title">{{ title() }}</h3>
      @if (message()) {
        <p class="df-empty-state__message">{{ message() }}</p>
      }
      @if (actionLabel()) {
        <df-button
          [label]="actionLabel()!"
          [icon]="actionIcon()"
          (pressed)="actionClick.emit()"
        />
      }
    </div>
  `,
  styles: `
    .df-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 40px 24px;
      text-align: center;
    }

    .df-empty-state__icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #94a3b8;
    }

    .df-empty-state__title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 500;
      color: #0f172a;
    }

    .df-empty-state__message {
      margin: 0;
      max-width: 360px;
      color: #64748b;
      font-size: 0.875rem;
      line-height: 1.5;
    }
  `,
})
export class DfEmptyStateComponent {
  readonly icon = input('inbox');
  readonly title = input.required<string>();
  readonly message = input<string | null>(null);
  readonly actionLabel = input<string | null>(null);
  readonly actionIcon = input<string | null>(null);

  readonly actionClick = output<void>();
}

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type DfButtonVariant = 'primary' | 'secondary' | 'ghost';
export type DfButtonColor = 'primary' | 'accent' | 'warn';

@Component({
  selector: 'df-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    @if (variant() === 'primary') {
      <button
        mat-flat-button
        [color]="color()"
        [type]="type()"
        [disabled]="disabled() || loading()"
        [class.df-button--loading]="loading()"
        (click)="pressed.emit($event)"
      >
        @if (loading()) {
          <mat-spinner diameter="18" />
        } @else if (icon()) {
          <mat-icon>{{ icon() }}</mat-icon>
        }
        <span>{{ label() }}</span>
      </button>
    } @else if (variant() === 'secondary') {
      <button
        mat-stroked-button
        [color]="color()"
        [type]="type()"
        [disabled]="disabled() || loading()"
        (click)="pressed.emit($event)"
      >
        @if (loading()) {
          <mat-spinner diameter="18" />
        } @else if (icon()) {
          <mat-icon>{{ icon() }}</mat-icon>
        }
        <span>{{ label() }}</span>
      </button>
    } @else {
      <button
        mat-button
        [color]="color()"
        [type]="type()"
        [disabled]="disabled() || loading()"
        (click)="pressed.emit($event)"
      >
        @if (loading()) {
          <mat-spinner diameter="18" />
        } @else if (icon()) {
          <mat-icon>{{ icon() }}</mat-icon>
        }
        <span>{{ label() }}</span>
      </button>
    }
  `,
  styles: `
    button {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .df-button--loading span {
      opacity: 0.85;
    }

    mat-spinner {
      display: inline-block;
    }
  `,
})
export class DfButtonComponent {
  readonly label = input.required<string>();
  readonly variant = input<DfButtonVariant>('primary');
  readonly color = input<DfButtonColor>('primary');
  readonly type = input<'button' | 'submit'>('button');
  readonly icon = input<string | null>(null);
  readonly loading = input(false);
  readonly disabled = input(false);

  readonly pressed = output<MouseEvent>();
}

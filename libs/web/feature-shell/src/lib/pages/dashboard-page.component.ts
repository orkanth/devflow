import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'df-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule],
  template: `
    <h1 class="page-title">Dashboard</h1>
    <mat-card>
      <mat-card-header>
        <mat-card-title>Welcome to DevFlow</mat-card-title>
        <mat-card-subtitle>Project & task management platform</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>
          Your dashboard widgets will live here — project summaries, task
          counts, and team activity.
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .page-title {
      margin: 0 0 16px;
      font-size: 1.5rem;
      font-weight: 500;
      color: #0f172a;
    }
  `,
})
export class DashboardPageComponent {}

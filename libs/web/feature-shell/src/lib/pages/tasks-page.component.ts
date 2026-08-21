import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'df-tasks-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule],
  template: `
    <h1 class="page-title">Tasks</h1>
    <mat-card>
      <mat-card-header>
        <mat-card-title>Tasks</mat-card-title>
        <mat-card-subtitle>Kanban board & task list</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>Kanban board with CDK drag-drop coming in the next phase.</p>
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
export class TasksPageComponent {}

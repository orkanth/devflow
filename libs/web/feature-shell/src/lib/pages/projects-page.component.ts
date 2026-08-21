import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'df-projects-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule],
  template: `
    <h1 class="page-title">Projects</h1>
    <mat-card>
      <mat-card-header>
        <mat-card-title>Projects</mat-card-title>
        <mat-card-subtitle>Manage your workspaces</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>Project list and CRUD UI coming in the next phase.</p>
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
export class ProjectsPageComponent {}

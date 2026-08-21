import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Project, CreateProjectDto } from '@devflow/shared-types';
import { ProjectStore } from '@devflow/web-data-access';
import {
  ProjectFormDialogComponent,
  ProjectFormDialogResult,
} from './project-form-dialog.component';
import { ProjectStatusChipComponent } from './project-status-chip.component';

@Component({
  selector: 'df-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule,
    ProjectStatusChipComponent,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
  private readonly store = inject(ProjectStore);
  private readonly dialog = inject(MatDialog);

  readonly projects = this.store.filteredProjects;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly activeCount = this.store.activeCount;
  readonly archivedCount = this.store.archivedCount;

  readonly searchInput = signal('');

  readonly displayedColumns = [
    'name',
    'description',
    'status',
    'createdAt',
    'actions',
  ];

  ngOnInit(): void {
    this.store.loadProjects();
  }

  onSearch(value: string): void {
    this.searchInput.set(value);
    this.store.setSearchQuery(value);
  }

  openCreateDialog(): void {
    const ref = this.dialog.open(ProjectFormDialogComponent, {
      width: '480px',
      maxWidth: '95vw',
      data: {},
    });

    ref.afterClosed().subscribe((result?: ProjectFormDialogResult) => {
      if (result?.mode === 'create') {
        this.store.createProject(result.data as CreateProjectDto);
      }
    });
  }

  openEditDialog(project: Project): void {
    const ref = this.dialog.open(ProjectFormDialogComponent, {
      width: '480px',
      maxWidth: '95vw',
      data: { project },
    });

    ref.afterClosed().subscribe((result?: ProjectFormDialogResult) => {
      if (result?.mode === 'update') {
        this.store.updateProject(project.id, result.data);
      }
    });
  }

  async deleteProject(project: Project): Promise<void> {
    const confirmed = confirm(`Delete "${project.name}"? This cannot be undone.`);
    if (confirmed) {
      await this.store.deleteProject(project.id);
    }
  }

  dismissError(): void {
    this.store.clearError();
  }
}

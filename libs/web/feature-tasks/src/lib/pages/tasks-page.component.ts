import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { UiModalService } from '@devflow/shared-ui';
import { CreateTaskDto, Task } from '@devflow/shared-types';
import { MOCK_PROJECTS, TaskStore, UserStore } from '@devflow/web-data-access';
import { TaskFormDialogComponent, TaskFormDialogResult } from '../components/task-form-dialog.component';
import { TaskKanbanBoardComponent } from '../components/task-kanban-board.component';
import { TaskListViewComponent } from '../components/task-list-view.component';

type TaskViewMode = 'kanban' | 'list';

@Component({
  selector: 'df-tasks-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    TaskKanbanBoardComponent,
    TaskListViewComponent,
  ],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss',
})
export class TasksPageComponent implements OnInit {
  private readonly store = inject(TaskStore);
  private readonly userStore = inject(UserStore);
  private readonly dialog = inject(MatDialog);
  private readonly modal = inject(UiModalService);

  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly statusCounts = this.store.statusCounts;
  readonly projects = MOCK_PROJECTS;
  readonly users = this.userStore.users;

  readonly viewMode = signal<TaskViewMode>('kanban');
  readonly searchInput = signal('');
  readonly filterProjectId = signal<string | null>(null);
  readonly filterAssigneeId = signal<string | null>(null);

  ngOnInit(): void {
    this.store.loadTasks();
    this.userStore.loadUsers();
  }

  setViewMode(mode: TaskViewMode): void {
    this.viewMode.set(mode);
  }

  onSearch(value: string): void {
    this.searchInput.set(value);
    this.store.setSearchQuery(value);
  }

  onProjectFilter(value: string): void {
    const projectId = value || null;
    this.filterProjectId.set(projectId);
    this.store.setFilterProjectId(projectId);
  }

  onAssigneeFilter(value: string): void {
    const assigneeId = value || null;
    this.filterAssigneeId.set(assigneeId);
    this.store.setFilterAssigneeId(assigneeId);
  }

  openCreateDialog(): void {
    const ref = this.dialog.open(TaskFormDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      data: {},
    });

    ref.afterClosed().subscribe((result?: TaskFormDialogResult) => {
      if (result?.mode === 'create') {
        this.store.createTask(result.data as CreateTaskDto);
      }
    });
  }

  openEditDialog(task: Task): void {
    const ref = this.dialog.open(TaskFormDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      data: { task },
    });

    ref.afterClosed().subscribe((result?: TaskFormDialogResult) => {
      if (result?.mode === 'update') {
        this.store.updateTask(task.id, result.data);
      }
    });
  }

  deleteTask(task: Task): void {
    this.modal
      .confirm({
        title: 'Delete task',
        message: `Delete "${task.title}"?`,
        confirmLabel: 'Delete',
        confirmColor: 'warn',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.store.deleteTask(task.id);
        }
      });
  }

  dismissError(): void {
    this.store.clearError();
  }
}

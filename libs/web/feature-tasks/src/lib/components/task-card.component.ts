import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Task } from '@devflow/shared-types';
import {
  MOCK_PROJECTS,
  RolePermissionsService,
  TaskStore,
  UserStore,
} from '@devflow/web-data-access';
import { TaskPriorityChipComponent } from './task-priority-chip.component';

@Component({
  selector: 'df-task-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkDrag,
    CdkDragHandle,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    TaskPriorityChipComponent,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent implements OnInit {
  private readonly userStore = inject(UserStore);
  private readonly taskStore = inject(TaskStore);
  private readonly permissions = inject(RolePermissionsService);

  readonly task = input.required<Task>();

  readonly edit = output<Task>();
  readonly delete = output<Task>();

  readonly users = this.userStore.users;
  readonly canEditTasks = this.permissions.canEditTasks;
  readonly canDeleteTasks = this.permissions.canDeleteTasks;
  readonly canAssignAnyone = this.permissions.canAssignTasksToAnyone;

  readonly assignableUsers = computed(() =>
    this.permissions.assignableUsers(this.users()),
  );

  ngOnInit(): void {
    this.userStore.loadUsers();
  }

  projectName(task: Task): string {
    return MOCK_PROJECTS.find((p) => p.id === task.projectId)?.name ?? 'Unknown';
  }

  assigneeName(task: Task): string {
    return this.userStore.getUserName(task.assigneeId);
  }

  isAssignedTo(task: Task, userId: string): boolean {
    return task.assigneeId === userId;
  }

  canShowAssignOption(userId: string | null): boolean {
    return this.permissions.canAssignTaskTo(userId);
  }

  async assignToSelf(task: Task): Promise<void> {
    const userId = this.assignableUsers()[0]?.id;
    if (userId) {
      await this.assignTo(task, userId);
    }
  }

  async assignTo(task: Task, assigneeId: string | null): Promise<void> {
    if (!this.canShowAssignOption(assigneeId)) {
      return;
    }
    if (task.assigneeId === assigneeId || (!task.assigneeId && !assigneeId)) {
      return;
    }
    await this.taskStore.updateTask(task.id, { assigneeId });
  }
}

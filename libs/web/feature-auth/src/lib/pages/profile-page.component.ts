import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  AuthSignInMethod,
  TASK_STATUS_LABELS,
  USER_ROLE_LABELS,
} from '@devflow/shared-types';
import { AuthStore, TaskStore } from '@devflow/web-data-access';

@Component({
  selector: 'df-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private readonly taskStore = inject(TaskStore);

  readonly user = this.authStore.currentUser;
  readonly authProvider = this.authStore.authProvider;

  readonly taskStats = computed(() => {
    const userId = this.user()?.id;
    if (!userId) {
      return { total: 0, todo: 0, in_progress: 0, done: 0 };
    }

    const tasks = this.taskStore
      .tasks()
      .filter((task) => task.assigneeId === userId);

    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === 'todo').length,
      in_progress: tasks.filter((t) => t.status === 'in_progress').length,
      done: tasks.filter((t) => t.status === 'done').length,
    };
  });

  ngOnInit(): void {
    this.taskStore.loadTasks();
  }

  userInitial(): string {
    const name = this.user()?.name ?? '?';
    return name.charAt(0).toUpperCase();
  }

  signInLabel(method: AuthSignInMethod | null): string {
    switch (method) {
      case 'google':
        return 'Google';
      case 'microsoft':
        return 'Microsoft';
      case 'email':
        return 'Email & password';
      default:
        return 'Unknown';
    }
  }

  signInIcon(method: AuthSignInMethod | null): string {
    switch (method) {
      case 'google':
        return 'account_circle';
      case 'microsoft':
        return 'business';
      default:
        return 'mail';
    }
  }

  roleLabel(role: string | undefined): string {
    if (!role) {
      return '—';
    }
    return USER_ROLE_LABELS[role as keyof typeof USER_ROLE_LABELS] ?? role;
  }

  statusLabel(status: 'todo' | 'in_progress' | 'done'): string {
    return TASK_STATUS_LABELS[status];
  }
}

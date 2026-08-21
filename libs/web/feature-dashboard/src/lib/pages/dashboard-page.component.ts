import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Task } from '@devflow/shared-types';
import {
  AuthStore,
  ProjectStore,
  TaskStore,
} from '@devflow/web-data-access';
import { DashboardStatCardComponent } from '../components/dashboard-stat-card.component';
import { MyTasksChartComponent } from '../components/my-tasks-chart.component';
import { MyTasksPanelComponent } from '../components/my-tasks-panel.component';

@Component({
  selector: 'df-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    DashboardStatCardComponent,
    MyTasksChartComponent,
    MyTasksPanelComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private readonly taskStore = inject(TaskStore);
  private readonly projectStore = inject(ProjectStore);
  private readonly router = inject(Router);

  readonly currentUser = this.authStore.currentUser;
  readonly loading = computed(
    () => this.taskStore.loading() || this.projectStore.loading(),
  );

  readonly myTaskStats = computed(() => {
    const userId = this.currentUser()?.id;
    if (!userId) {
      return { todo: 0, in_progress: 0, done: 0, total: 0 };
    }

    const myTasks = this.taskStore
      .tasks()
      .filter((task) => task.assigneeId === userId);

    return {
      todo: myTasks.filter((t) => t.status === 'todo').length,
      in_progress: myTasks.filter((t) => t.status === 'in_progress').length,
      done: myTasks.filter((t) => t.status === 'done').length,
      total: myTasks.length,
    };
  });

  readonly myActiveTasks = computed(() => {
    const userId = this.currentUser()?.id;
    if (!userId) {
      return [];
    }

    const priorityOrder: Record<Task['priority'], number> = {
      high: 0,
      medium: 1,
      low: 2,
    };

    const statusOrder: Record<Task['status'], number> = {
      in_progress: 0,
      todo: 1,
      done: 2,
    };

    return this.taskStore
      .tasks()
      .filter(
        (task) =>
          task.assigneeId === userId && task.status !== 'done',
      )
      .sort((a, b) => {
        const statusDiff = statusOrder[a.status] - statusOrder[b.status];
        if (statusDiff !== 0) {
          return statusDiff;
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, 8);
  });

  readonly activeProjects = this.projectStore.activeCount;

  ngOnInit(): void {
    this.authStore.initialize();
    this.taskStore.loadTasks();
    this.projectStore.loadProjects();
  }

  viewAllMyTasks(): void {
    const userId = this.currentUser()?.id;
    if (userId) {
      this.taskStore.setFilterAssigneeId(userId);
      this.taskStore.setSearchQuery('');
      this.taskStore.setFilterProjectId(null);
    }
    this.router.navigate(['/tasks']);
  }
}

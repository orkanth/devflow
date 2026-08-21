import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthStore, RolePermissionsService, UserStore } from '@devflow/web-data-access';

@Component({
  selector: 'df-shell-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './shell-header.component.html',
  styleUrl: './shell-header.component.scss',
})
export class ShellHeaderComponent {
  private readonly authStore = inject(AuthStore);
  private readonly userStore = inject(UserStore);
  private readonly permissions = inject(RolePermissionsService);
  private readonly router = inject(Router);

  readonly menuToggle = output<void>();

  readonly currentUser = this.authStore.currentUser;
  readonly users = this.userStore.users;
  readonly canSwitchUser = this.permissions.isAdmin;

  switchUser(userId: string): void {
    const user = this.users().find((u) => u.id === userId);
    if (user) {
      this.authStore.loginAsDemoUser(user);
    }
  }

  signOut(): void {
    this.authStore.logout();
    this.router.navigate(['/auth/login']);
  }
}

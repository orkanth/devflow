import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '@devflow/web-data-access';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'df-shell-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './shell-sidebar.component.html',
  styleUrl: './shell-sidebar.component.scss',
})
export class ShellSidebarComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Projects', route: '/projects', icon: 'folder' },
    { label: 'Tasks', route: '/tasks', icon: 'assignment' },
    { label: 'Users', route: '/users', icon: 'group' },
  ];

  signOut(): void {
    this.authStore.logout();
    this.router.navigate(['/auth/login']);
  }
}

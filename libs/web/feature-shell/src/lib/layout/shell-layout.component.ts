import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ShellHeaderComponent } from './shell-header.component';
import { ShellSidebarComponent } from './shell-sidebar.component';

@Component({
  selector: 'df-shell-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    ShellHeaderComponent,
    ShellSidebarComponent,
  ],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  private readonly sidenav = viewChild(MatSidenav);

  readonly sidenavMode = signal<'side' | 'over'>('side');
  readonly sidenavOpened = signal(true);

  toggleSidenav(): void {
    const nav = this.sidenav();
    if (nav) {
      nav.toggle();
      this.sidenavOpened.set(nav.opened);
    }
  }

  onSidenavClosed(): void {
    this.sidenavOpened.set(false);
  }

  onSidenavOpened(): void {
    this.sidenavOpened.set(true);
  }
}

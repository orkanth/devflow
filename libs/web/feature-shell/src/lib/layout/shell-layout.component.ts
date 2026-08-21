import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
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
export class ShellLayoutComponent implements OnInit {
  private readonly breakpoint = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sidenav = viewChild(MatSidenav);

  readonly isMobile = signal(false);
  readonly sidebarCollapsed = signal(false);
  readonly sidenavMode = signal<'side' | 'over'>('side');
  readonly sidenavOpened = signal(true);

  ngOnInit(): void {
    this.breakpoint
      .observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        const mobile = state.matches;
        this.isMobile.set(mobile);
        this.sidenavMode.set(mobile ? 'over' : 'side');

        if (!mobile) {
          this.sidenavOpened.set(true);
          const nav = this.sidenav();
          if (nav && !nav.opened) {
            nav.open();
          }
        }
      });
  }

  toggleSidenav(): void {
    if (this.isMobile()) {
      const nav = this.sidenav();
      if (nav) {
        nav.toggle();
        this.sidenavOpened.set(nav.opened);
      }
      return;
    }

    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  onSidenavClosed(): void {
    this.sidenavOpened.set(false);
  }

  onSidenavOpened(): void {
    this.sidenavOpened.set(true);
  }
}

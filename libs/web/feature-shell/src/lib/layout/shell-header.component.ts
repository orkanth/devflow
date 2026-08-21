import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthStore, UserStore } from '@devflow/web-data-access';

@Component({
  selector: 'df-shell-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './shell-header.component.html',
  styleUrl: './shell-header.component.scss',
})
export class ShellHeaderComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private readonly userStore = inject(UserStore);

  readonly menuToggle = output<void>();

  readonly currentUser = this.authStore.currentUser;
  readonly users = this.userStore.users;

  ngOnInit(): void {
    this.authStore.initialize();
  }

  switchUser(userId: string): void {
    this.authStore.setCurrentUser(userId);
  }
}

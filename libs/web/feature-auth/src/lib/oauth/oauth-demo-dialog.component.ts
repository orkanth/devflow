import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OAuthProvider } from '@devflow/shared-types';
import { OAUTH_DEMO_PROVIDERS } from './oauth-demo.constants';

export interface OAuthDemoDialogData {
  provider: OAuthProvider;
}

export interface OAuthDemoDialogResult {
  confirmed: boolean;
}

@Component({
  selector: 'df-oauth-demo-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './oauth-demo-dialog.component.html',
  styleUrl: './oauth-demo-dialog.component.scss',
})
export class OAuthDemoDialogComponent {
  readonly data = inject<OAuthDemoDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(
    MatDialogRef<OAuthDemoDialogComponent, OAuthDemoDialogResult>,
  );

  readonly info = OAUTH_DEMO_PROVIDERS[this.data.provider];

  cancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  continue(): void {
    this.dialogRef.close({ confirmed: true });
  }
}

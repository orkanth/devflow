import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  UiConfirmDialogComponent,
  UiConfirmDialogData,
} from './ui-confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class UiModalService {
  private readonly dialog = inject(MatDialog);

  confirm(data: UiConfirmDialogData): Observable<boolean> {
    const ref = this.dialog.open(UiConfirmDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      data,
    });
    return ref.afterClosed();
  }
}

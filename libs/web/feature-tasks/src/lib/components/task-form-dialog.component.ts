import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  CreateTaskDto,
  Task,
  TaskPriority,
  TaskStatus,
  UpdateTaskDto,
} from '@devflow/shared-types';
import { MOCK_PROJECTS } from '@devflow/web-data-access';

export interface TaskFormDialogData {
  task?: Task;
}

export interface TaskFormDialogResult {
  mode: 'create' | 'update';
  data: CreateTaskDto | UpdateTaskDto;
}

@Component({
  selector: 'df-task-form-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './task-form-dialog.component.html',
  styleUrl: './task-form-dialog.component.scss',
})
export class TaskFormDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<TaskFormDialogComponent>);
  private readonly data = inject<TaskFormDialogData>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  readonly projects = MOCK_PROJECTS;
  readonly isEdit = !!this.data.task;

  readonly form = this.fb.nonNullable.group({
    projectId: ['', Validators.required],
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: ['', Validators.maxLength(500)],
    status: ['todo' as TaskStatus, Validators.required],
    priority: ['medium' as TaskPriority, Validators.required],
  });

  ngOnInit(): void {
    if (this.data.task) {
      this.form.setValue({
        projectId: this.data.task.projectId,
        title: this.data.task.title,
        description: this.data.task.description ?? '',
        status: this.data.task.status,
        priority: this.data.task.priority,
      });
    } else if (this.projects.length > 0) {
      this.form.patchValue({ projectId: this.projects[0].id });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const data = {
      ...raw,
      description: raw.description.trim() || undefined,
    };

    this.dialogRef.close({
      mode: this.isEdit ? 'update' : 'create',
      data,
    } satisfies TaskFormDialogResult);
  }
}

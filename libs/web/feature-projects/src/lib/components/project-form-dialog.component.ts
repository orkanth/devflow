import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  CreateProjectDto,
  Project,
  ProjectStatus,
  UpdateProjectDto,
} from '@devflow/shared-types';

export interface ProjectFormDialogData {
  project?: Project;
}

export interface ProjectFormDialogResult {
  mode: 'create' | 'update';
  data: CreateProjectDto | UpdateProjectDto;
}

@Component({
  selector: 'df-project-form-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './project-form-dialog.component.html',
  styleUrl: './project-form-dialog.component.scss',
})
export class ProjectFormDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<ProjectFormDialogComponent>);
  private readonly data = inject<ProjectFormDialogData>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  readonly isEdit = !!this.data.project;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.maxLength(300)]],
    status: ['active' as ProjectStatus, Validators.required],
  });

  ngOnInit(): void {
    if (this.data.project) {
      this.form.setValue({
        name: this.data.project.name,
        description: this.data.project.description,
        status: this.data.project.status,
      });
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

    const value = this.form.getRawValue();
    this.dialogRef.close({
      mode: this.isEdit ? 'update' : 'create',
      data: value,
    } satisfies ProjectFormDialogResult);
  }
}

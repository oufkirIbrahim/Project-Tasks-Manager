import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {Project, ProjectRequestDTO} from '../../../core/models/project.model';
import {ProjectService} from '../../../core/services/project.service';



interface DialogData {
  project?: Project;
}
@Component({
  selector: 'app-project-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './project-form-dialog.component.html',
  styleUrl: './project-form-dialog.component.scss'
})
export class ProjectFormDialogComponent implements OnInit{
  projectForm: FormGroup;
  editMode = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProjectFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['']
    }, { validators: this.endDateValidator });
  }

  ngOnInit(): void {
    if (this.data.project) {
      this.editMode = true;
      this.projectForm.patchValue({
        name: this.data.project.name,
        description: this.data.project.description,
        startDate: new Date(this.data.project.startDate),
        endDate: this.data.project.endDate ? new Date(this.data.project.endDate) : null
      });
    }
  }

  endDateValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      group.get('endDate')?.setErrors({ endDateInvalid: true });
      return { endDateInvalid: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    this.submitting = true;

    const formData = this.projectForm.value;
    const projectRequest: ProjectRequestDTO = {
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate.toISOString().split('T')[0],
      endDate: formData.endDate ? formData.endDate.toISOString().split('T')[0] : undefined
    };

    if (this.editMode && this.data.project?.id) {
      this.projectService.updateProject(this.data.project.id, projectRequest).subscribe({
        next: () => {
          this.showNotification('Project updated successfully', 'success');
          this.dialogRef.close(true);
        },
        error: () => {
          this.showNotification('Error updating project', 'error');
          this.submitting = false;
        }
      });
    } else {
      this.projectService.createProject(projectRequest).subscribe({
        next: () => {
          this.showNotification('Project created successfully', 'success');
          this.dialogRef.close(true);
        },
        error: () => {
          this.showNotification('Error creating project', 'error');
          this.submitting = false;
        }
      });
    }
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}

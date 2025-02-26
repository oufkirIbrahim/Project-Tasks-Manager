import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../../core/services/task.service';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,

  ],
  templateUrl: './task-form-dialog.component.html',
  styleUrl: './task-form-dialog.component.scss'
})
export class TaskFormDialogComponent implements OnInit {
  taskForm: FormGroup;
  loading = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      projectId: number;
      projectName: string;
      task?: any;
    }
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['PENDING', Validators.required],
      dueDate: [null],
      projectId: [this.data.projectId, Validators.required]
    });

    // Check if we're editing an existing task
    if (this.data.task) {
      this.isEditMode = true;
      this.taskForm.patchValue({
        title: this.data.task.title,
        description: this.data.task.description,
        status: this.data.task.status,
        dueDate: this.data.task.dueDate ? new Date(this.data.task.dueDate) : null
      });
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.loading = true;
    const taskData = this.taskForm.value;

    if (this.isEditMode) {
      this.taskService.updateTask(this.data.task.id, taskData).subscribe({
        next: (result) => {
          this.loading = false;
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('Error updating task:', error);
          this.loading = false;
        }
      });
    } else {
      this.taskService.createTask(taskData).subscribe({
        next: (result) => {
          this.loading = false;
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

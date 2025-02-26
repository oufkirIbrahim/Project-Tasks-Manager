import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { TaskStatus } from '../../../core/models/task.model';
import { ProjectService } from '../../../core/services/project.service';
import {PageProjectResponseDTO, Project} from '../../../core/models/project.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode: boolean = false;
  taskId!: number;
  loading: boolean = false;
  statusOptions = Object.values(TaskStatus);
  projects: Project[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required]],
      status: [TaskStatus.PENDING],
      dueDate: [''],
      projectId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = +params['id'];
        this.loadTaskDetails();
        this.taskForm.get('projectId')?.disable();
      }
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (response: PageProjectResponseDTO) => {
        this.projects = response.content;
      },
      error: (error) => {
        console.error('Error loading projects', error);
      }
    });
  }



  loadTaskDetails(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (response) => {
        const task = response.content.find(t => t.id === this.taskId);
        if (task) {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
            projectId: task.projectId
          });
        } else {
          alert('Task not found');
          this.router.navigate(['/tasks']);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading task details', error);
        this.loading = false;
        this.router.navigate(['/tasks']);
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const formValue = this.taskForm.value;

    if (this.isEditMode) {
      const updateData = {
        title: formValue.title,
        description: formValue.description,
        status: formValue.status,
        dueDate: formValue.dueDate || undefined,
        projectId: formValue.projectId
      };

      this.taskService.updateTask(this.taskId, updateData).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error updating task', error);
        }
      });
    } else {
      const newTask = {
        title: formValue.title,
        description: formValue.description,
        dueDate: formValue.dueDate || undefined,
        projectId: formValue.projectId
      };

      this.taskService.createTask(newTask).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error creating task', error);
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {Project} from '../../../core/models/project.model';
import {ProjectService} from '../../../core/services/project.service';
import {TaskProjection} from '../../../core/models/task.model';
import {ProjectFormDialogComponent} from '../project-form-dialog/project-form-dialog.component';
import {ComponentType} from '@angular/cdk/portal';
// Import the TaskFormDialogComponent (you'll need to create this)
import {TaskFormDialogComponent} from '../../../shared/components/task-form-dialog/task-form-dialog.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit{
  project: Project | null = null;
  projectTasks: TaskProjection[] = [];
  loading: boolean = true;
  completedTasksCount: number = 0;
  projectProgress: number = 0;
  private ConfirmDialogComponent: ComponentType<unknown> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const projectId: number = Number(this.route.snapshot.paramMap.get('id'));
    if (projectId) {
      this.loadProject(projectId);
    } else {
      this.loading = false;
    }
  }

  loadProject(id: number): void {
    this.loading = true;
    this.projectService.getProjectById(id).subscribe({
      next: (project: Project) => {
        this.project = project;
        this.loadProjectTasks(id);
      },
      error: () => {
        this.showNotification('Error loading project', 'error');
        this.loading = false;
      }
    });
  }

  loadProjectTasks(projectId: number): void {
    this.projectService.getTasksByProjectId(projectId).subscribe({
      next: (tasks: TaskProjection[]) => {
        this.projectTasks = tasks;
        this.completedTasksCount = tasks.filter(task => task.status === 'COMPLETED').length;
        this.calculateProjectProgress();
        this.loading = false;
      },
      error: (error) => {
        this.showNotification('Error loading project tasks', 'error');
        this.loading = false;
      }
    });
  }

  calculateProjectProgress(): void {
    if (this.projectTasks.length === 0) {
      this.projectProgress = 0;
    } else {
      this.projectProgress = Math.round((this.completedTasksCount / this.projectTasks.length) * 100);
    }
  }

  isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  }

  openProjectDialog(): void {
    if (this.project) {
      const dialogRef = this.dialog.open(ProjectFormDialogComponent, {
        width: '600px',
        data: { project: this.project }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && this.project?.id) {
          this.loadProject(this.project.id);
        }
      });
    }
  }

  openCreateTaskDialog(): void {
    if (this.project) {
      const dialogRef = this.dialog.open(TaskFormDialogComponent, {
        width: '600px',
        disableClose: false, // Allow closing by clicking outside
        autoFocus: true, // Auto focus the first form element
        data: {
          projectId: this.project.id,
          projectName: this.project.name
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && this.project?.id) {
          this.loadProjectTasks(this.project.id);
        }
      });
    }
  }


  confirmDeleteProject(): void {
    if (this.project) {
      const dialogRef = this.dialog.open(this.ConfirmDialogComponent!, {
        width: '400px',
        data: {
          title: 'Delete Project',
          message: `Are you sure you want to delete "${this.project.name}"? This action will also delete all associated tasks and cannot be undone.`,
          confirmText: 'Delete',
          confirmColor: 'warn'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && this.project?.id) {
          this.deleteProject(this.project.id);
        }
      });
    }
  }

  deleteProject(id: number): void {
    this.loading = true;
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.showNotification('Project deleted successfully', 'success');
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        this.showNotification('Error deleting project', 'error');
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'status-completed';
      case 'IN_PROGRESS':
        return 'status-in-progress';
      case 'PENDING':
        return 'status-pending';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  }
}

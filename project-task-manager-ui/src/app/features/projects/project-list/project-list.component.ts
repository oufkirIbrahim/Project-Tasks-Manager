import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import {PageProjectResponseDTO, Project} from '../../../core/models/project.model';
import {ProjectService} from '../../../core/services/project.service';
import { ProjectFormDialogComponent } from '../project-form-dialog/project-form-dialog.component';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ConfirmDialogComponent
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {

  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'taskCount', 'actions'];
  projects: Project[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Project>;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectService.getProjects(this.pageIndex, this.pageSize)
      .subscribe({
        next: (response: PageProjectResponseDTO) => {
          this.projects = response.content;
          this.totalElements = response.totalElements;
          this.loading = false;
        },
        error: (error) => {
          this.showNotification('Error loading projects', 'error');
          this.loading = false;
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProjects();
  }

  openProjectDialog(project?: Project): void {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent,  {
      width: '600px',
      data: { project }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProjects();
      }
    });
  }

  confirmDeleteProject(project: Project): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Project',
        message: `Are you sure you want to delete "${project.name}"? This cannot be undone.`,
        confirmText: 'Delete',
        confirmColor: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(project);
      }
    });
  }

  deleteProject(project: Project): void {
    if (project.id) {
      this.loading = true;
      this.projectService.deleteProject(project.id).subscribe({
        next: () => {
          this.showNotification(`Project "${project.name}" deleted successfully`, 'success');
          this.loadProjects();
        },
        error: (error) => {
          this.showNotification('Error deleting project', 'error');
          this.loading = false;
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

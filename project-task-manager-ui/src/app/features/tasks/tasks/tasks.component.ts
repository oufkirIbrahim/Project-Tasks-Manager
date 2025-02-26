import {Component, OnInit, OnDestroy} from '@angular/core';
import {TaskService} from '../../../core/services/task.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PageTaskResponseDTO, TaskStatus} from '../../../core/models/task.model';
import {CommonModule} from '@angular/common';
import {Task} from '../../../core/models/task.model';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ProjectService} from '../../../core/services/project.service';
import {Project} from '../../../core/models/project.model';
import {Observable, Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {SearchService} from '../../../core/services/search.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  projects: Record<number, Project> = {};
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  loading: boolean = false;
  currentFilter: string = 'all';
  searchTerm: string = '';

  private searchSubscription: Subscription | null = null;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ page = 0, size = 10, filter = 'all', search = '' }) => {
      this.currentPage = Number(page);
      this.pageSize = Number(size);
      this.currentFilter = filter;
      this.searchTerm = search;
      this.loadTasks();
    });

    // Subscribe to search service to get search terms from header
    this.searchSubscription = this.searchService.getSearchTerm().subscribe(term => {
      if (term !== this.searchTerm) {
        this.searchTerm = term;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: 0,
            size: this.pageSize,
            filter: this.currentFilter,
            search: term || null  // Only add search param if there's a term
          },
          queryParamsHandling: 'merge'
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadTasks(): void {
    this.loading = true;
    let taskObservable: Observable<PageTaskResponseDTO>;

    // If we have a search term, use it regardless of filter
    if (this.searchTerm) {
      taskObservable = this.taskService.getTasksByTitle(this.searchTerm, this.currentPage, this.pageSize);
    } else {
      // Otherwise use the filter
      switch (this.currentFilter) {
        case 'pending':
          taskObservable = this.taskService.getTasksByStatus(TaskStatus.PENDING, this.currentPage, this.pageSize);
          break;
        case 'in-progress':
          taskObservable = this.taskService.getTasksByStatus(TaskStatus.IN_PROGRESS, this.currentPage, this.pageSize);
          break;
        case 'completed':
          taskObservable = this.taskService.getTasksByStatus(TaskStatus.COMPLETED, this.currentPage, this.pageSize);
          break;
        default:
          taskObservable = this.taskService.getTasks(this.currentPage, this.pageSize);
          break;
      }
    }

    taskObservable.subscribe({
      next: (response: PageTaskResponseDTO) => {
        this.tasks = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
        this.loadProjects(); // Load projects after loading tasks
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks', error);
        this.loading = false;
      }
    });
  }

  changePage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page,
        size: this.pageSize,
        filter: this.currentFilter,
        search: this.searchTerm || null
      },
      queryParamsHandling: 'merge'
    });
  }

  changePageSize(size: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 0,
        size,
        filter: this.currentFilter,
        search: this.searchTerm || null
      },
      queryParamsHandling: 'merge'
    });
  }

  changeFilter(filter: string): void {
    // When changing filter, clear the search term if one exists
    if (this.searchTerm) {
      this.searchService.clearSearch();
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 0,
        size: this.pageSize,
        filter,
        search: null // Clear search when changing filter
      },
      queryParamsHandling: 'merge'
    });
  }

  // Rest of your component methods remain the same
  getPageArray(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i);
  }

  getVisiblePageRange(): number[] {
    const range: number[] = [];
    const start = Math.max(1, Math.min(this.currentPage - 1, this.totalPages - 4));
    const end = Math.min(start + 3, this.totalPages - 1);

    for (let i = start; i < end; i++) {
      range.push(i);
    }

    return range;
  }

  deleteTask(taskId: number | undefined): void {
    if (taskId) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error('Error deleting task', error);
        }
      });
    }
  }

  confirmDeleteTask(task: Task | undefined): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Task',
        message: `Are you sure you want to delete task "${task?.title}"?`,
        confirmText: 'Delete',
        confirmColor: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(task?.id);
      }
    });
  }

  getStatusClass(status: TaskStatus | undefined): string {
    switch (status) {
      case TaskStatus.PENDING:
        return 'status-pending';
      case TaskStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TaskStatus.COMPLETED:
        return 'status-completed';
      default:
        return '';
    }
  }

  loadProjects(): void {
    const projectIds = this.tasks
      .map(task => task.projectId)
      .filter((id, index, self) => id && self.indexOf(id) === index); // Remove duplicates

    projectIds.forEach((id) => {
      this.projectService.getProjectById(id).subscribe({
        next: (project) => {
          // @ts-ignore
          this.projects[id] = project;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading project', err);
        }
      });
    });
  }

  getProjectName(projectId: number | undefined): string {
    return projectId && this.projects[projectId]
      ? this.projects[projectId].name
      : '-';
  }
}

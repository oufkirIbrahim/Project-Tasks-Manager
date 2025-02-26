import { Routes } from '@angular/router';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';
import { TasksComponent } from './features/tasks/tasks/tasks.component';
import { TaskFormComponent } from './features/tasks/task-form/task-form.component';

export const routes: Routes = [
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent
  },
  {
    path: 'tasks',
    children: [
      {
        path: '',
        component: TasksComponent
      },
      {
        path: 'new',
        component: TaskFormComponent
      },
      {
        path: ':id/edit',
        component: TaskFormComponent
      },
      {
        path: ':status',
        component: TasksComponent
      }
    ]
  }
];

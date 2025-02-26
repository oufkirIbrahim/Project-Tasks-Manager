import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

import {
  Project,
  ProjectRequestDTO,
  PageProjectResponseDTO,
} from '../models/project.model';
import { TaskProjection } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private path = '/projects';

  constructor(private apiService: ApiService) {}

  getProjects(page: number = 0, size: number = 10): Observable<PageProjectResponseDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.apiService.get<PageProjectResponseDTO>(this.path, params);
  }

  getProjectById(id: number | undefined): Observable<Project> {
    return this.apiService.get<Project>(`${this.path}/${id}`);
  }

  createProject(project: ProjectRequestDTO): Observable<number> {
    return this.apiService.post<number, ProjectRequestDTO>(this.path, project);
  }

  updateProject(id: number, project: ProjectRequestDTO): Observable<void> {
    return this.apiService.put<void, ProjectRequestDTO>(`${this.path}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${id}`);
  }

  getTasksByProjectId(id: number): Observable<TaskProjection[]> {
    return this.apiService.get<TaskProjection[]>(`${this.path}/${id}/tasks`);
  }
}

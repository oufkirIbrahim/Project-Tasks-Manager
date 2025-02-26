import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  Task,
  TaskRequestDTO,
  UpdateTaskDTO,
  PageTaskResponseDTO,
  TaskStatus
} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private path = '/tasks';

  constructor(private apiService: ApiService) {}

  getTasks(page: number = 0, size: number = 10): Observable<PageTaskResponseDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.apiService.get<PageTaskResponseDTO>(this.path, params);
  }

  getTasksByTitle(title: string, page: number = 0, size: number = 10): Observable<PageTaskResponseDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.apiService.get<PageTaskResponseDTO>(`${this.path}/title/${title}`, params);
  }

  getTasksByStatus(status: TaskStatus, page: number = 0, size: number = 10): Observable<PageTaskResponseDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.apiService.get<PageTaskResponseDTO>(`${this.path}/status/${status}`, params);
  }

  createTask(task: TaskRequestDTO): Observable<number> {
    return this.apiService.post<number, TaskRequestDTO>(this.path, task);
  }

  updateTask(taskId: number, task: UpdateTaskDTO): Observable<number> {
    return this.apiService.put<number, UpdateTaskDTO>(`${this.path}/${taskId}`, task);
  }

  deleteTask(taskId: number | undefined): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${taskId}`);
  }
}

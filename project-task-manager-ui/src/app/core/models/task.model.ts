import {Project} from './project.model';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  status?: TaskStatus;
  dueDate?: string;
  projectId?: number;
}
export interface TaskProject{
  id?: number;
  title: string;
  description: string;
  status?: TaskStatus;
  dueDate?: string;
  project?: Project;
}
export interface TaskRequestDTO {
  title: string;
  description: string;
  dueDate?: string;
  projectId?: number;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: TaskStatus;
}

export interface TaskResponseDTO extends Task {}

export interface TaskProjection {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
}

export interface PageTaskResponseDTO {
  content: TaskResponseDTO[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

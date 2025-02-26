export interface Project {
  id?: number;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  taskCount?: number;
}

export interface ProjectRequestDTO {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface ProjectResponseDTO extends Project {}

export interface PageProjectResponseDTO {
  content: ProjectResponseDTO[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

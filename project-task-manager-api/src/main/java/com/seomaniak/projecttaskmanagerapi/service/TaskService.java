package com.seomaniak.projecttaskmanagerapi.service;

import com.seomaniak.projecttaskmanagerapi.dto.TaskRequestDTO;
import com.seomaniak.projecttaskmanagerapi.dto.TaskResponseDTO;
import com.seomaniak.projecttaskmanagerapi.dto.UpdateTaskDTO;
import com.seomaniak.projecttaskmanagerapi.entity.Status;
import com.seomaniak.projecttaskmanagerapi.projection.TaskProjection;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TaskService {
    List<TaskProjection> getTasksByProjectId(Long id);

    Long createTask(@Valid TaskRequestDTO taskRequestDTO);

    Long updateTask(Long taskId, UpdateTaskDTO taskRequestDTO);

    void deleteTask(Long taskId);

    Page<TaskResponseDTO> getTasks(int page, int size);

    Page<TaskResponseDTO> getTasksByStatus(String status, int page, int size);

    Page<TaskResponseDTO> getTasksByTitle(String title, int page, int size);
}

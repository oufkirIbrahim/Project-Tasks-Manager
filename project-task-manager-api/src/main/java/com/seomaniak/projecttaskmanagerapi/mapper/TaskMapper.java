package com.seomaniak.projecttaskmanagerapi.mapper;

import com.seomaniak.projecttaskmanagerapi.dto.TaskRequestDTO;
import com.seomaniak.projecttaskmanagerapi.dto.TaskResponseDTO;
import com.seomaniak.projecttaskmanagerapi.dto.UpdateTaskDTO;
import com.seomaniak.projecttaskmanagerapi.entity.Status;
import com.seomaniak.projecttaskmanagerapi.entity.Task;
import org.springframework.data.domain.Page;

import java.util.Optional;

public class TaskMapper {
    public static TaskResponseDTO toTaskResponseDTO(Task task) {
        return TaskResponseDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .projectId(task.getProject().getId())
                .build();
    }

    public static Task toTask(TaskRequestDTO taskRequestDTO) {
        return Task.builder()
                .title(taskRequestDTO.getTitle())
                .description(taskRequestDTO.getDescription())
                .dueDate(taskRequestDTO.getDueDate())
                .build();
    }



    public static void updateTask(Task task, UpdateTaskDTO updateTaskDTO) {
        Optional.ofNullable(updateTaskDTO.getTitle()).ifPresent(task::setTitle);
        Optional.ofNullable(updateTaskDTO.getDescription()).ifPresent(task::setDescription);
        Optional.ofNullable(updateTaskDTO.getDueDate()).ifPresent(task::setDueDate);
        Optional.ofNullable(updateTaskDTO.getStatus()).ifPresent(task::setStatus);
    }

    public static Page<TaskResponseDTO> toTaskResponsePage(Page<Task> tasks) {
        return tasks.map(TaskMapper::toTaskResponseDTO);
    }
}

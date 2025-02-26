package com.seomaniak.projecttaskmanagerapi.service.impl;

import com.seomaniak.projecttaskmanagerapi.dto.TaskRequestDTO;
import com.seomaniak.projecttaskmanagerapi.dto.TaskResponseDTO;
import com.seomaniak.projecttaskmanagerapi.dto.UpdateTaskDTO;
import com.seomaniak.projecttaskmanagerapi.entity.Project;
import com.seomaniak.projecttaskmanagerapi.entity.Status;
import com.seomaniak.projecttaskmanagerapi.entity.Task;
import com.seomaniak.projecttaskmanagerapi.mapper.TaskMapper;
import com.seomaniak.projecttaskmanagerapi.projection.TaskProjection;
import com.seomaniak.projecttaskmanagerapi.repository.ProjectRepository;
import com.seomaniak.projecttaskmanagerapi.repository.TaskRepository;
import com.seomaniak.projecttaskmanagerapi.service.TaskService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    @Override
    public List<TaskProjection> getTasksByProjectId(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Project not found with id: " + id));
        return taskRepository.findByProject(project);
    }

    @Override
    public Long createTask(TaskRequestDTO taskRequestDTO) {
        Project project = projectRepository.findById(taskRequestDTO.getProjectId()).orElseThrow(() ->
                new EntityNotFoundException("Project not found with id: " + taskRequestDTO.getProjectId()));

        Task newTask = TaskMapper.toTask(taskRequestDTO);
        newTask.setStatus(Status.PENDING);
        newTask.setProject(project);

        return taskRepository.save(newTask).getId();
    }

    @Override
    public Long updateTask(Long taskId, UpdateTaskDTO updateTaskDTO) {
        Task task = taskRepository.findById(taskId).orElseThrow(() ->
                new EntityNotFoundException("Task not found with id: " + taskId));

        TaskMapper.updateTask(task, updateTaskDTO);

        return taskRepository.save(task).getId();
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() ->
                new EntityNotFoundException("Task not found with id: " + taskId));

        taskRepository.delete(task);
    }

    @Override
    public Page<TaskResponseDTO> getTasks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dueDate").ascending());
        Page<Task> tasks = taskRepository.findAll(pageable);
        return TaskMapper.toTaskResponsePage(tasks);
    }

    @Override
    public Page<TaskResponseDTO> getTasksByStatus(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dueDate").ascending());
        Page<Task> tasks = taskRepository.findByStatus(Status.valueOf(status), pageable);
        return TaskMapper.toTaskResponsePage(tasks);
    }

    @Override
    public Page<TaskResponseDTO> getTasksByTitle(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dueDate").ascending());
        Page<Task> tasks = taskRepository.findByTitle(title, pageable);
        return TaskMapper.toTaskResponsePage(tasks);
    }

}

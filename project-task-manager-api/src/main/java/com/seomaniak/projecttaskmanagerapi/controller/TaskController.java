package com.seomaniak.projecttaskmanagerapi.controller;

import com.seomaniak.projecttaskmanagerapi.dto.TaskRequestDTO;
import com.seomaniak.projecttaskmanagerapi.dto.TaskResponseDTO;
import com.seomaniak.projecttaskmanagerapi.dto.UpdateTaskDTO;
import com.seomaniak.projecttaskmanagerapi.entity.Status;
import com.seomaniak.projecttaskmanagerapi.service.TaskService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("tasks")
@RequiredArgsConstructor
@Tag(name = "Task", description = "Task operations")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Long> createTask( @RequestBody @Valid TaskRequestDTO taskRequestDTO) {
        return ResponseEntity.ok(taskService.createTask(taskRequestDTO));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Long> updateTask(@PathVariable Long taskId, @RequestBody UpdateTaskDTO updateTaskDTO) {
        return ResponseEntity.ok(taskService.updateTask(taskId, updateTaskDTO));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Page<TaskResponseDTO>> getTasks(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.ok(taskService.getTasks(page, size));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<TaskResponseDTO>> getTasksByStatus(
            @PathVariable String status,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size) {

        return ResponseEntity.ok(taskService.getTasksByStatus(status, page, size));
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<Page<TaskResponseDTO>> getTasksByTitle(
            @PathVariable String title,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size) {

        return ResponseEntity.ok(taskService.getTasksByTitle(title, page, size));
    }
}

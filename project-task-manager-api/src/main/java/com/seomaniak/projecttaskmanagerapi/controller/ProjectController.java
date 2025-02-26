package com.seomaniak.projecttaskmanagerapi.controller;

import com.seomaniak.projecttaskmanagerapi.dto.ProjectRequestDTO;
import com.seomaniak.projecttaskmanagerapi.dto.ProjectResponseDTO;
import com.seomaniak.projecttaskmanagerapi.projection.TaskProjection;
import com.seomaniak.projecttaskmanagerapi.service.ProjectService;
import com.seomaniak.projecttaskmanagerapi.service.TaskService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("projects")
@RequiredArgsConstructor
@Tag(name = "Project", description = "Project operations")
public class ProjectController {

    private final ProjectService projectService;
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<Page<ProjectResponseDTO>> getProjects(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.ok(projectService.getProjects(page, size));
    }

    @PostMapping
    public ResponseEntity<Long> createProject(@RequestBody @Valid ProjectRequestDTO projectRequestDTO) {
        return ResponseEntity.ok(projectService.createProject(projectRequestDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProject(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProject(@PathVariable Long id, @RequestBody ProjectRequestDTO projectRequestDTO) {
        projectService.updateProject(id, projectRequestDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/tasks")
    public ResponseEntity<List<TaskProjection>> getTasksByProjectId(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTasksByProjectId(id));
    }

}

package com.seomaniak.projecttaskmanagerapi.service.impl;

import com.seomaniak.projecttaskmanagerapi.dto.ProjectRequestDTO;
import com.seomaniak.projecttaskmanagerapi.dto.ProjectResponseDTO;
import com.seomaniak.projecttaskmanagerapi.entity.Project;
import com.seomaniak.projecttaskmanagerapi.mapper.ProjectMapper;
import com.seomaniak.projecttaskmanagerapi.repository.ProjectRepository;
import com.seomaniak.projecttaskmanagerapi.service.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public Page<ProjectResponseDTO> getProjects(int page, int size) {
        // Pageable defines the page number, page size, and sorting (by startDate descending)
        Pageable pageable = PageRequest.of(page, size, Sort.by("startDate").descending());

        // Custom query retrieves projects and their task count in a single query using a LEFT JOIN and GROUP BY.
        Page<Object[]> result = projectRepository.findProjectsWithTaskCount(pageable);

        // Map the result to a DTO by extracting project and task count from the query result
        return result.map(record -> {
            // The first element in the Object[] is the Project entity
            Project project = (Project) record[0];

            // The second element in the Object[] is the task count
            long taskCount = (long) record[1];  // Task count retrieved directly from the database

            // Return a ProjectResponseDTO with both the project details and task count
            return ProjectMapper.toProjectResponseDTO(project, taskCount);
        });
    }

    @Override
    public Long createProject(ProjectRequestDTO projectRequestDTO) {
        // Map the ProjectRequestDTO to a Project entity
        Project project = ProjectMapper.toProject(projectRequestDTO);

        // Save the project to the database
        return projectRepository.save(project).getId();
    }

    @Override
    public void updateProject(Long id, ProjectRequestDTO projectRequestDTO) {
        // Find the project by ID
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));

        // Update the project with the new details
        ProjectMapper.updateProject(project, projectRequestDTO);

        // Save the updated project
        projectRepository.save(project);
    }

    @Override
    public void deleteProject(Long id) {
        // Find the project by ID
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));

        // Delete the project from the db
        projectRepository.delete(project);
    }

    @Override
    public ProjectResponseDTO getProject(Long id) {
        // Find the project by ID
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));

        // Map the Project entity to a ProjectResponseDTO
        return ProjectMapper.toProjectResponseDTO(project, (long) project.getTasks().size());
    }
}

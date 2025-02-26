package com.seomaniak.projecttaskmanagerapi.mapper;

import com.seomaniak.projecttaskmanagerapi.dto.ProjectRequestDTO;
import com.seomaniak.projecttaskmanagerapi.dto.ProjectResponseDTO;
import com.seomaniak.projecttaskmanagerapi.entity.Project;

import java.util.Optional;

public class ProjectMapper {
    public static ProjectResponseDTO toProjectResponseDTO(Project project, Long taskCount) {
        return ProjectResponseDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .taskCount(taskCount)
                .build();
    }

    public static Project toProject(ProjectRequestDTO projectRequestDTO) {
        return Project.builder()
                .name(projectRequestDTO.getName())
                .description(projectRequestDTO.getDescription())
                .startDate(projectRequestDTO.getStartDate())
                .build();
    }

    public static void updateProject(Project project, ProjectRequestDTO projectRequestDTO) {

        Optional.ofNullable(projectRequestDTO.getName())
                .ifPresent(project::setName);

        Optional.ofNullable(projectRequestDTO.getDescription())
                .ifPresent(project::setDescription);

        Optional.ofNullable(projectRequestDTO.getStartDate())
                .ifPresent(project::setStartDate);

        Optional.ofNullable(projectRequestDTO.getEndDate())
                .ifPresent(project::setEndDate);

    }

}

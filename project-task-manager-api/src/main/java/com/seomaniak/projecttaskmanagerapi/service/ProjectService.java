package com.seomaniak.projecttaskmanagerapi.service;

import com.seomaniak.projecttaskmanagerapi.dto.ProjectRequestDTO;
import com.seomaniak.projecttaskmanagerapi.dto.ProjectResponseDTO;
import com.seomaniak.projecttaskmanagerapi.dto.TaskResponseDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProjectService {
    Page<ProjectResponseDTO> getProjects(int page, int size);

    Long createProject(ProjectRequestDTO projectRequestDTO);

    void updateProject(Long id, ProjectRequestDTO projectRequestDTO);

    void deleteProject(Long id);


    ProjectResponseDTO getProject(Long id);
}

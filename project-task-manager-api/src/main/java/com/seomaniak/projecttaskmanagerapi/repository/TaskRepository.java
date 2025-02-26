package com.seomaniak.projecttaskmanagerapi.repository;

import com.seomaniak.projecttaskmanagerapi.dto.TaskResponseDTO;
import com.seomaniak.projecttaskmanagerapi.entity.Project;
import com.seomaniak.projecttaskmanagerapi.entity.Status;
import com.seomaniak.projecttaskmanagerapi.entity.Task;
import com.seomaniak.projecttaskmanagerapi.projection.TaskProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<TaskProjection> findByProject(Project project);

    Page<Task> findByStatus(Status status, Pageable pageable);

    Page<Task> findByTitle(String title, Pageable pageable);
}

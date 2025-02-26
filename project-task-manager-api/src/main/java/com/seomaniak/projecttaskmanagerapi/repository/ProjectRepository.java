package com.seomaniak.projecttaskmanagerapi.repository;

import com.seomaniak.projecttaskmanagerapi.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p, COUNT(t) FROM Project p LEFT JOIN p.tasks t GROUP BY p.id")
    Page<Object[]> findProjectsWithTaskCount(Pageable pageable);

}

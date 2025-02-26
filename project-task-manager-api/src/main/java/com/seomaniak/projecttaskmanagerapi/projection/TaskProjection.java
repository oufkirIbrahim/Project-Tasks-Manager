package com.seomaniak.projecttaskmanagerapi.projection;

import com.seomaniak.projecttaskmanagerapi.entity.Status;

import java.time.LocalDate;

public interface TaskProjection {
    Long getId();
    String getTitle();
    String getDescription();
    Status getStatus();
    LocalDate getDueDate();
}

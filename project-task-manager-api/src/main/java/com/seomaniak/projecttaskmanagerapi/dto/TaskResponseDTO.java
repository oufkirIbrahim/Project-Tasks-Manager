package com.seomaniak.projecttaskmanagerapi.dto;

import com.seomaniak.projecttaskmanagerapi.entity.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Status status;
    private LocalDate dueDate;
    private Long projectId;
}

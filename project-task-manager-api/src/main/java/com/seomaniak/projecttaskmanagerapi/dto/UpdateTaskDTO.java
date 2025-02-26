package com.seomaniak.projecttaskmanagerapi.dto;

import com.seomaniak.projecttaskmanagerapi.entity.Status;
import lombok.*;


import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateTaskDTO {
    private String title;
    private String description;
    private LocalDate dueDate;
    private Status status;
}

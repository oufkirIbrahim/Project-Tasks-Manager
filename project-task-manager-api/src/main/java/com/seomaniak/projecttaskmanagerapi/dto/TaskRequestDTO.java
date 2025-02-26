package com.seomaniak.projecttaskmanagerapi.dto;

import com.seomaniak.projecttaskmanagerapi.entity.Status;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRequestDTO {
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;
    @NotBlank(message = "Description is required")
    private String description;
    @FutureOrPresent(message = "Due date must be today or in the future")
    private LocalDate dueDate;
    @Min(value = 1, message = "Project id must be greater than 0")
    private Long projectId;
}

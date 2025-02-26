package com.seomaniak.projecttaskmanagerapi.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequestDTO {

    @NotBlank(message = "Project name must not be empty")
    @Size(max = 255, message = "Project name must not exceed 255 characters")
    private String name;

    @NotBlank(message = "Description must not be empty")
    private String description;

    @NotNull(message = "Start date must not be null")
    @FutureOrPresent(message = "Start date must be today or in the future")
    private LocalDate startDate;

    @FutureOrPresent(message = "End date must be today or in the future")
    private LocalDate endDate;
}

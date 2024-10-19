package com.khinmyo.todolistwebapplication.dto;

import com.khinmyo.todolistwebapplication.enums.PriorityEnum;
import com.khinmyo.todolistwebapplication.enums.StatusEnum;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskListDto {

    private Long id;
    private String title;
    private String description;

    private StatusEnum status;
    private PriorityEnum priority;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public TaskListDto(Long id, String title, String description, StatusEnum status, PriorityEnum priority, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

package com.khinmyo.todolistwebapplication.dto;

import com.khinmyo.todolistwebapplication.enums.PriorityEnum;
import com.khinmyo.todolistwebapplication.enums.StatusEnum;
import com.khinmyo.todolistwebapplication.model.Users;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDto {
    private Long id;
    private String title;
    private String description;

    private StatusEnum status;
    private PriorityEnum priority;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Long userId;

}

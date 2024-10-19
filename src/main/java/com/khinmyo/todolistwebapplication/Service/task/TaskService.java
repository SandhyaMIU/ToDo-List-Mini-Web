package com.khinmyo.todolistwebapplication.Service.task;

import com.khinmyo.todolistwebapplication.dto.TaskDto;
import com.khinmyo.todolistwebapplication.dto.TaskListDto;
import com.khinmyo.todolistwebapplication.exception.TaskNotFoundException;
import com.khinmyo.todolistwebapplication.exception.UserNotFoundException;
import com.khinmyo.todolistwebapplication.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    List<TaskListDto> getAllTasksByUser(Long userId);
    Optional<Task> getByTaskId(Long id) throws TaskNotFoundException;

    Task createTask(Long userId, TaskDto taskDto) throws UserNotFoundException;
    Task updateTask(Long id, TaskDto updatedTaskDto) throws TaskNotFoundException;
    void deleteTask(Long id) throws TaskNotFoundException;

}

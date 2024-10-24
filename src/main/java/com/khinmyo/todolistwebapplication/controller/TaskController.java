package com.khinmyo.todolistwebapplication.controller;

import com.khinmyo.todolistwebapplication.Service.task.TaskService;
import com.khinmyo.todolistwebapplication.dto.TaskDto;
import com.khinmyo.todolistwebapplication.dto.TaskListDto;
import com.khinmyo.todolistwebapplication.enums.PriorityEnum;
import com.khinmyo.todolistwebapplication.enums.StatusEnum;
import com.khinmyo.todolistwebapplication.exception.TaskNotFoundException;
import com.khinmyo.todolistwebapplication.exception.UserNotFoundException;
import com.khinmyo.todolistwebapplication.model.Task;
import com.khinmyo.todolistwebapplication.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/todo-list/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepo taskRepo;

    @PostMapping(value = "/add/{userId}")
    public ResponseEntity<Task> createTask(@PathVariable Long userId, @RequestBody TaskDto taskDto) throws UserNotFoundException {
        Task createdTask = taskService.createTask(userId, taskDto);
        return ResponseEntity.ok(createdTask);
    }

    @PutMapping("/edit/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody TaskDto updatedTaskDto) throws TaskNotFoundException {
        Task updatedTaskResult = taskService.updateTask(taskId, updatedTaskDto);
        return ResponseEntity.ok(updatedTaskResult);
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) throws TaskNotFoundException {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<TaskListDto>> getAllTasks(@PathVariable Long userId){
        List<TaskListDto> allTasks = taskService.getAllTasksByUser(userId);
        return ResponseEntity.ok(allTasks);
    }

}

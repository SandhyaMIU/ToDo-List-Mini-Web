package com.khinmyo.todolistwebapplication.Service.task;

import com.khinmyo.todolistwebapplication.dto.TaskDto;
import com.khinmyo.todolistwebapplication.dto.TaskListDto;
import com.khinmyo.todolistwebapplication.exception.TaskNotFoundException;
import com.khinmyo.todolistwebapplication.exception.UserNotFoundException;
import com.khinmyo.todolistwebapplication.model.Task;
import com.khinmyo.todolistwebapplication.model.Users;
import com.khinmyo.todolistwebapplication.repository.TaskRepo;
import com.khinmyo.todolistwebapplication.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<TaskListDto> getAllTasksByUser(Long userId) {

        List<Task> tasks = taskRepo.findTasksByUser(userId);

        return tasks.stream()
                .map(task -> new TaskListDto(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getStatus(),
                        task.getPriority(),
                        task.getCreatedAt(),
                        task.getUpdatedAt()
                )).toList();
    }

    @Override
    public Optional<Task> getByTaskId(Long id) {
        return taskRepo.findById(id);
    }

    @Override
    public Task createTask(Long userId, TaskDto taskDto) throws UserNotFoundException {
        Users user = userRepo.findById(userId).orElse(null);
        if (user != null) {
            Task task = new Task();
            task.setTitle(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());
            task.setPriority(taskDto.getPriority());
            task.setStatus(taskDto.getStatus());
            task.setUser(user);
            task.setCreatedAt(LocalDateTime.now());
            return taskRepo.save(task);
        } else {
            throw new UserNotFoundException("User with ID " + userId + " not found to create task.");
        }
    }

    @Override
    public Task updateTask(Long id, TaskDto updatedTaskDto) throws TaskNotFoundException {

        Optional<Task> existingTaskOpt = taskRepo.findById(id);

        if (existingTaskOpt.isPresent()) {
            Task existingTask = existingTaskOpt.get();

            existingTask.setTitle(updatedTaskDto.getTitle());
            existingTask.setDescription(updatedTaskDto.getDescription());
            existingTask.setStatus(updatedTaskDto.getStatus());
            existingTask.setPriority(updatedTaskDto.getPriority());
            existingTask.setUpdatedAt(LocalDateTime.now());

            return taskRepo.save(existingTask);
        } else {
            throw new TaskNotFoundException("Task with ID " + id + " not found to update.");
        }
    }

    @Override
    public void deleteTask(Long id) throws TaskNotFoundException {
        Task task = taskRepo.findById(id).orElse(null);
        if (task == null) {
            throw new TaskNotFoundException("Task with ID " + id + " not found to delete.");
        } else {
            taskRepo.delete(task);
        }
    }
}

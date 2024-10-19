package com.khinmyo.todolistwebapplication.repository;

import com.khinmyo.todolistwebapplication.enums.PriorityEnum;
import com.khinmyo.todolistwebapplication.enums.StatusEnum;
import com.khinmyo.todolistwebapplication.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {
    List<Task> findByStatus(StatusEnum status);

    List<Task> findByPriority(PriorityEnum priority);

    @Query("SELECT t from Task t where t.user.userID = :userId")
    List<Task> findTasksByUser(@Param("userId") Long userId);
}

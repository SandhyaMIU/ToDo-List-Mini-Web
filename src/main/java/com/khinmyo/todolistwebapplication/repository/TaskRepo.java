package com.khinmyo.todolistwebapplication.repository;

import com.khinmyo.todolistwebapplication.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {

    @Query("SELECT t from Task t where t.user.userID = :userId order by t.status")
    List<Task> findTasksByUser(@Param("userId") Long userId);
}

package com.khinmyo.todolistwebapplication.repository;

import com.khinmyo.todolistwebapplication.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
    Optional<Users> findByEmailAndPassword(String email, String password);
}

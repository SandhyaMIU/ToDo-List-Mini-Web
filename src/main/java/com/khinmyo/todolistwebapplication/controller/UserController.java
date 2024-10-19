package com.khinmyo.todolistwebapplication.controller;

import com.khinmyo.todolistwebapplication.Service.user.UserService;
import com.khinmyo.todolistwebapplication.dto.LoginDto;
import com.khinmyo.todolistwebapplication.dto.UserDto;
import com.khinmyo.todolistwebapplication.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/todo-list/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/register")
    public Long saveUser(@RequestBody UserDto userDto) {
        return userService.registerUser(userDto);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginDto loginDto) {
        LoginResponse loginResponse = userService.loginUser(loginDto);
        return ResponseEntity.ok(loginResponse);
    }
}

package com.khinmyo.todolistwebapplication.dto;

import lombok.Data;

@Data
public class UserDto {
    private String userName;
    private String email;
    private String password;
}
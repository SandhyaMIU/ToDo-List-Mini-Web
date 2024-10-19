package com.khinmyo.todolistwebapplication.Service.user;

import com.khinmyo.todolistwebapplication.dto.LoginDto;
import com.khinmyo.todolistwebapplication.dto.UserDto;
import com.khinmyo.todolistwebapplication.model.Users;
import com.khinmyo.todolistwebapplication.response.LoginResponse;

import java.util.List;

public interface UserService {

    Long registerUser(UserDto userDto);

    LoginResponse loginUser(LoginDto loginDto);

    List<Users> getAllUsers();

    void deleteUserById(Long id);

    Users updateUsersById(Long id, Users users);
}

package com.khinmyo.todolistwebapplication.Service.user;

import com.khinmyo.todolistwebapplication.dto.LoginDto;
import com.khinmyo.todolistwebapplication.dto.UserDto;
import com.khinmyo.todolistwebapplication.model.Users;
import com.khinmyo.todolistwebapplication.repository.UserRepo;
import com.khinmyo.todolistwebapplication.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Long registerUser(UserDto userDto) {

        Users user = new Users();
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        userRepo.save(user);

        return user.getUserID();
    }

    @Override
    public LoginResponse loginUser(LoginDto loginDto) {
        Users user = userRepo.findByEmail(loginDto.getEmail());

        if (user != null) {
            String password = loginDto.getPassword();
            String encodedPassword = user.getPassword();
            Boolean validPassword = passwordEncoder.matches(password, encodedPassword);
            if (validPassword) {
                Optional<Users> loginUser = userRepo.findByEmailAndPassword(loginDto.getEmail(), encodedPassword);
                if (loginUser.isPresent()) {
                    return new LoginResponse("Login Success", true, loginUser.get().getUserID());
                } else {
                    return new LoginResponse("Login Failed", false, null);
                }
            } else {
                return new LoginResponse("Password Not Match", false, null);
            }
        } else {
            return new LoginResponse("Email Not Found", false, null);
        }
    }


    @Override
    public List<Users> getAllUsers() {
        return null;
    }

    @Override
    public void deleteUserById(Long id) {
    }

    @Override
    public Users updateUsersById(Long id, Users users) {
        return null;
    }
}

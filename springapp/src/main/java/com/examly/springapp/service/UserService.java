package com.examly.springapp.service;
 
import org.springframework.stereotype.Service;
 
import com.examly.springapp.model.User;
 
@Service
public interface UserService {
    String registerUser(User user);
    String loginUser(User user);
    User getUserByUsername(String username);
}

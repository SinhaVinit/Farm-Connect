package com.examly.springapp.service;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
 
import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
 
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    PasswordEncoder passwordEncoder;
 
    @Autowired
    AuthenticationManager authenticationManager;
 
    @Autowired
    UserRepo userRepo;
 
    @Autowired
    JwtUtils jwtUtils;
 
    public String registerUser(User user) {
        User existingUserByUsername = userRepo.findByUsername(user.getUsername());
        User existingUserByEmail = userRepo.findByEmail(user.getEmail());
        User existingUserByMobileNumber = userRepo.findByMobileNumber(user.getMobileNumber());
        if (existingUserByUsername != null) {
            return "User name already taken.";
        }
        else if(existingUserByEmail != null) {
            return "Email already registered.";
        }
        else if(existingUserByMobileNumber != null) {
            return "Mobile number already registered.";
        }
        else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
            return "Registered Successfully.";
        }
 
    }
 
    public String loginUser(User user) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            User selectedUser = userRepo.findByUsername(user.getUsername());
            String role = selectedUser.getUserRole();
            int userId = selectedUser.getUserId();
            return jwtUtils.generateToken(user.getUsername(), role, userId);
        } else {
            throw new UsernameNotFoundException("User request is invalid");
        }
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }
 
}

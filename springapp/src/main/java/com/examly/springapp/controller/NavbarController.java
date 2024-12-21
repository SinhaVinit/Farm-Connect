package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserServiceImpl;

@RestController
public class NavbarController {
    @Autowired
    UserServiceImpl userServiceimpl;

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        try {
            User user = userServiceimpl.getUserByUsername(username);
            return new ResponseEntity<>(user, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }
}

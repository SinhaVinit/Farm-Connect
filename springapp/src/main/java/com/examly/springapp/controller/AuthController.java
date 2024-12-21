package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.User;

import com.examly.springapp.service.UserServiceImpl;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    UserServiceImpl userServiceimpl;

    @PostMapping(path = "/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        String registerMessage = userServiceimpl.registerUser(user);
        try {
            if(registerMessage == "Registered Successfully.") {
                return new ResponseEntity<>(registerMessage, HttpStatusCode.valueOf(201));
            }
            return new ResponseEntity<>(registerMessage,HttpStatusCode.valueOf(409));
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatusCode.valueOf(500));
        }
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            return new ResponseEntity<>(userServiceimpl.loginUser(user), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}

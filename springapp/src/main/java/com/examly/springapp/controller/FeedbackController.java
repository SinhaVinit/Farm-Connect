package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackServiceImpl;

@RestController
public class FeedbackController {
    @Autowired
    FeedbackServiceImpl feedbackServiceImpl;

    @PostMapping("api/feedback/{userId}")
    public ResponseEntity<?> addFeedback(@RequestBody Feedback feedback,@PathVariable int userId){
        try{
            return new ResponseEntity<>(feedbackServiceImpl.addFeedback(feedback,userId),HttpStatusCode.valueOf(201));
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatusCode.valueOf(500));
        }
    }



    @GetMapping("api/feedback")
    public ResponseEntity<?> getFeedbackAll(){
        try{
            return new ResponseEntity<>(feedbackServiceImpl.getAllFeedbacks(),HttpStatusCode.valueOf(200));
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatusCode.valueOf(500));
        }
    }

    @DeleteMapping("api/feedback/{id}")
    public ResponseEntity<?> deleteFeed(@PathVariable int id){
        try{
            return new ResponseEntity<>(feedbackServiceImpl.deleteFeed(id),HttpStatusCode.valueOf(200));
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("api/feedback/user/{userId}")
    public ResponseEntity<?> getfeedbackById(@PathVariable int userId){
        try{
            return new ResponseEntity<>(feedbackServiceImpl.getFeedbackByUserId(userId),HttpStatusCode.valueOf(200));
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatusCode.valueOf(500));
        }
    }

    @PutMapping(path = "/api/feedback/{id}")
    public ResponseEntity<?> updateFeedbackById(@PathVariable int id, @RequestBody Feedback updatedFeedback) {
    try {
        Feedback newFeedback = feedbackServiceImpl.updateFeedback(id, updatedFeedback);
        return new ResponseEntity<>(newFeedback, HttpStatusCode.valueOf(200));
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(204));
    }
    }

}

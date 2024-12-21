package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService{

    @Autowired
    FeedbackRepo feedbackRepo;
    @Autowired
    UserRepo userRepo;
    
    @Override
    public Feedback addFeedback(Feedback feedback,int userId) {
       User user = userRepo.findById(userId).get();
       feedback.setUser(user);
       return feedbackRepo.save(feedback);
    }

    @Override
    public List<Feedback> getFeedbackByUserId(int userId) {
       return feedbackRepo.findByUserId(userId);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @Override
    public boolean deleteFeed(int id) {
      // Optional<Feedback> optionalFeedback = feedbackRepo.findById(id);
      if(feedbackRepo.existsById(id)){
        feedbackRepo.deleteById(id);
        return true;
      }
      return false;
    }

    @Override
    public Feedback updateFeedback(int id, Feedback updatedFeedback) {
        Feedback feedback = feedbackRepo.findById(id).get();
        feedback.setFeedbackText(updatedFeedback.getFeedbackText());
        return feedbackRepo.save(feedback);
    
    }

    
}
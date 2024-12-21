package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Feedback;
@Repository
public interface FeedbackRepo extends JpaRepository<Feedback,Integer>{

    @Query("SELECT f FROM Feedback f WHERE f.user.userId = :userId")
    public List<Feedback> findByUserId(@Param("userId") int userId);
}
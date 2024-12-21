package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Feed;
@Repository
public interface FeedRepo extends JpaRepository<Feed,Integer>{

    @Query("SELECT f fROM Feed f WHERE f.user.userId = :userId")
    List<Feed> findFeedsByUserId(@Param("userId")int userId); 

}
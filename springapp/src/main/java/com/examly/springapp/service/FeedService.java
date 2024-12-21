package com.examly.springapp.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.model.Feed;

public interface FeedService {

    public Feed addFeed(MultipartFile image, Feed feed, int userId) throws IOException;
    public Optional<Feed> getFeedById(int feedId);
    public List<Feed> getAllFeeds();
    public Feed updateFeed(int feedId, MultipartFile image, Feed feed, int userId) throws IOException;
    public List<Feed> getFeedsByUserId(int userID);
    public Optional<Feed> deleteFeed(int feedId);
}

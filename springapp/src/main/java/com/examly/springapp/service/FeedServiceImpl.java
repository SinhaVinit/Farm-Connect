package com.examly.springapp.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.exception.SameNameException;
import com.examly.springapp.model.Feed;
import com.examly.springapp.model.Medicine;
import com.examly.springapp.model.Request;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedRepo;
import com.examly.springapp.repository.RequestRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class FeedServiceImpl implements FeedService {

    @Autowired
    FeedRepo feedRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    RequestRepo requestRepo;

    @Override
    public Feed addFeed(MultipartFile image, Feed feed, int userId) throws IOException {
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            List<Feed> feeds = feedRepo.findFeedsByUserId(userId);
            for (Feed f : feeds) {
                if (f.getFeedName().equalsIgnoreCase(feed.getFeedName())
                        && f.getType().equalsIgnoreCase(feed.getType())) {
                    throw new SameNameException("Feed with this Name and Type already exists!!");
                }
            }
            feed.setUser(userOptional.get());
            feed.setImage(image.getBytes());
            return feedRepo.save(feed);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public Optional<Feed> getFeedById(int feedId) {
        if (feedRepo.existsById(feedId)) {
            return feedRepo.findById(feedId);
        }
        return null;
    }

    @Override
    public List<Feed> getAllFeeds() {

        return feedRepo.findAll();
    }

    @Override
    public Feed updateFeed(int feedId, MultipartFile image, Feed feed, int userId) throws IOException {
        User user = userRepo.findById(userId).get();
        Optional<Feed> existingFeedOptional = feedRepo.findById(feedId);
        if (existingFeedOptional.isPresent()) {
            List<Feed> feeds = feedRepo.findFeedsByUserId(userId);
            for (Feed f : feeds) {
                if (!(f.getFeedName().equalsIgnoreCase(existingFeedOptional.get().getFeedName())
                        && f.getType().equalsIgnoreCase(existingFeedOptional.get().getType()))) {
                    if (f.getFeedName().equalsIgnoreCase(feed.getFeedName())
                            && f.getType().equalsIgnoreCase(feed.getType())) {
                        throw new SameNameException("Feed with this Name and Type already exists!!");
                    }
                }
            }
            Feed existingFeed = existingFeedOptional.get();
            existingFeed.setFeedName(feed.getFeedName());
            existingFeed.setType(feed.getType());
            existingFeed.setDescription(feed.getDescription());
            existingFeed.setUnit(feed.getUnit());
            existingFeed.setPricePerUnit(feed.getPricePerUnit());
            existingFeed.setQuantity(feed.getQuantity());
            existingFeed.setUser(user);

            if (image != null && !image.isEmpty()) {
                existingFeed.setImage(image.getBytes());
            }
            return feedRepo.save(existingFeed);
        } else {
            throw new RuntimeException("Feed not found");
        }
    }

    @Override
    public List<Feed> getFeedsByUserId(int userID) {
        return feedRepo.findFeedsByUserId(userID);

    }

    @Override
    public Optional<Feed> deleteFeed(int feedId) {
        System.out.println("Inside");
        if (feedRepo.existsById(feedId)) {
            Optional<Feed> optionalFeed = feedRepo.findById(feedId);
            List<Request> requests = requestRepo.findByFeedId(feedId);
            for(Request request : requests) {
                request.setFeed(null);
                requestRepo.save(request);
            }
            feedRepo.deleteById(feedId);
            return optionalFeed;
        }
        return Optional.empty();
    }

}
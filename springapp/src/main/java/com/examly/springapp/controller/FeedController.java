package com.examly.springapp.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.exception.SameNameException;
import com.examly.springapp.model.Feed;
import com.examly.springapp.model.Medicine;
import com.examly.springapp.service.FeedServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class FeedController {
   @Autowired
   FeedServiceImpl feedServiceImpl;
   
    // @PostMapping("/api/feed/{userId}")
    // public ResponseEntity<?> addFeed(@RequestParam("image") MultipartFile image, @RequestParam("feed") String feedJson, @PathVariable int userId) {
    //     try {
    //         Feed feed = new ObjectMapper().readValue(feedJson, Feed.class);
    //         return new ResponseEntity<>(feedServiceImpl.addFeed(image, feed, userId), HttpStatus.CREATED);
    //     } catch (IOException e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     } catch (RuntimeException e) {
    //         return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    //     }
    // }
    @PostMapping("/api/feed/{userId}")
    public ResponseEntity<?> addFeed(
            @PathVariable int userId,
            @RequestParam String feedName,
            @RequestParam String type,
            @RequestParam String description,
            @RequestParam int quantity,
            @RequestParam String unit,
            @RequestParam double pricePerUnit,
            @RequestParam("image") MultipartFile image) {
        try {
            Feed feed = new Feed();
            feed.setFeedName(feedName);
            feed.setType(type);
            feed.setDescription(description);
            feed.setQuantity(quantity);
            feed.setUnit(unit);
            feed.setPricePerUnit(pricePerUnit);
            Feed savedFeed= feedServiceImpl.addFeed(image, feed, userId);
            return new ResponseEntity<>(savedFeed, HttpStatusCode.valueOf(201));
        } catch (SameNameException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatusCode.valueOf(500));
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/api/feed")
    public ResponseEntity<?> getAllFeeds() {
        try {
            return new ResponseEntity<>(feedServiceImpl.getAllFeeds(), HttpStatusCode.valueOf(200));

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

   

    @PutMapping("/api/feed/{feedId}/{userId}")
    public ResponseEntity<?> updateFeed(
            @PathVariable int feedId,
            @RequestParam String feedName,
            @RequestParam String type,
            @RequestParam String description,
            @RequestParam int quantity,
            @RequestParam String unit,
            @RequestParam double pricePerUnit,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @PathVariable int userId) {
        try {
            Feed updatedFeed = new Feed();
            updatedFeed.setFeedName(feedName);
            updatedFeed.setType(type);
            updatedFeed.setDescription(description);
            updatedFeed.setQuantity(quantity);
            updatedFeed.setUnit(unit);
            updatedFeed.setPricePerUnit(pricePerUnit);

            Feed updated = feedServiceImpl.updateFeed(feedId, image ,updatedFeed, userId);
            if (updated != null) {
                return new ResponseEntity<>(updated, HttpStatusCode.valueOf(200));

            } else {
                return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));

            }
        } catch (SameNameException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatusCode.valueOf(500));
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }


    @GetMapping("/api/feed/{feedId}")
    public ResponseEntity<?> getFeedByID(@PathVariable int feedId){
        try {
            return new ResponseEntity<>(feedServiceImpl.getFeedById(feedId).get(), HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @DeleteMapping("/api/feed/{feedId}")
    public ResponseEntity<?> deleteFeeds(@PathVariable int feedId){
        System.out.println("Inside controller");
        try {
            System.out.println("Deleting");
            Feed feed=feedServiceImpl.deleteFeed(feedId).get();
            // Optional<Feed> deletedFeed = feedServiceImpl.getFeedById(feedId);
            if(feed!=null){
                // boolean status=feedServiceImpl.deleteFeed(feedId);
                return new ResponseEntity<>(feed, HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/api/feed/user/{userId}")
    public ResponseEntity<?> getFeedByUserId(@PathVariable int userId){
        try {
            return new ResponseEntity<>(feedServiceImpl.getFeedsByUserId(userId), HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }
 @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable int id) {
        Optional<Feed> feed = feedServiceImpl.getFeedById(id);
        if (feed.isPresent() && feed.get().getImage() != null) {
            byte[] image = feed.get().getImage();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"image.jpg\"")
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(image);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }   
}



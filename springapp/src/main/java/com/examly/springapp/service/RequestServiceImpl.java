package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feed;
import com.examly.springapp.model.LiveStock;
import com.examly.springapp.model.Medicine;
import com.examly.springapp.model.Request;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedRepo;
import com.examly.springapp.repository.LiveStockRepo;
import com.examly.springapp.repository.MedicineRepo;
import com.examly.springapp.repository.RequestRepo;
import com.examly.springapp.repository.UserRepo;


@Service
public class RequestServiceImpl implements RequestService{

    @Autowired
    RequestRepo requestRepo;
 
    @Autowired
    FeedRepo feedRepo;
 
    @Autowired
    MedicineRepo medicineRepo;
 
    @Autowired
    LiveStockRepo liveStockRepo;
 
    @Autowired
    UserRepo useRepo;
 
    @Override
    public Request addRequest(Request request,int userId,int feedId,int medicineId,int livestockId) {
 
        
        if(request.getRequestType().equals("Feed")){
            Feed feed = feedRepo.findById(feedId).get();
            request.setFeed(feed);
        }else if(request.getRequestType().equals("Medicine")){
            Medicine medicine = medicineRepo.findById(medicineId).get();
            request.setMedicine(medicine);
        }
 
        LiveStock liveStock=liveStockRepo.findById(livestockId).get();
        request.setLivestock(liveStock);
 
        User user=useRepo.findById(userId).get();
        request.setUser(user);

        request.setStatus("pending");
        request.setDate(LocalDate.now());
 
        return requestRepo.save(request);
    }

    @Override
    public List<Request> getAllRequest() {
        return requestRepo.findAll();
    }

    @Override
    public List<Request> getAllMyRequest(int userId) {
        return requestRepo.findByUserId(userId);
    }

    @Override
    public Optional<Request> getRequestById(int requestId) {
        Optional<Request> optionalRequest = requestRepo.findById(requestId);
        if(optionalRequest.isPresent()) {
            return optionalRequest;
        }
        return null;
    }

    @Override
    public boolean deleteRequest(int requestId) {
        if(requestRepo.existsById(requestId)) {
            requestRepo.deleteById(requestId);
            return true;
        }
        return false;
    }

    @Override
    public Request updateRequest(int requestId, Request request) {
        Optional<Request> optionalRequest = requestRepo.findById(requestId);
        if(optionalRequest.isPresent()) {
            Request updateRequest = optionalRequest.get();
            updateRequest.setLivestock(request.getLivestock());
            updateRequest.setQuantity(request.getQuantity());
            updateRequest.setStatus(request.getStatus());
            return requestRepo.save(updateRequest);
        }
        return null;
    }

    public List<Request> getRequestBySupplierId(int supplierId) {
        List<Request> requests = requestRepo.findAll();

        List<Request> filteredRequest = new ArrayList<>();
        for(int i=0; i<requests.size(); i++) {
            System.out.println(i);
            Request request = requests.get(i);
            System.out.println(request.getRequestType());
            if(request.getRequestType().equals("Feed")) {
                System.out.println("Inside Feed");
                if(request.getFeed() == null) {
                    continue;
                }
                else if(request.getFeed().getUser().getUserId() == supplierId) {
                    System.out.println("Found user");
                    filteredRequest.add(request);
                }
            }
            else if(request.getRequestType().equals("Medicine")) {
                System.out.println("Inside Medicine");
                if(request.getMedicine() == null) {
                    continue;
                }
                else if(request.getMedicine().getUser().getUserId() == supplierId) {
                    System.out.println("Found user");
                    filteredRequest.add(request);
                }
            }
        }
        System.out.println(filteredRequest);
        return filteredRequest;
    }

    public Request statusUpdate(int requestId, Request request) {
        int quantity = 0;
        Optional<Request> optionalRequest = requestRepo.findById(requestId);
        if(optionalRequest.isPresent()) {
            Request updateRequest = optionalRequest.get();
            if(request.getStatus().equals("Approved")) {
                if(request.getRequestType().equals("Feed")) {
                    quantity = request.getQuantity();
                    Feed feed = feedRepo.findById(request.getFeed().getFeedId()).get();
                    feed.setQuantity(feed.getQuantity()-quantity);
                    feedRepo.save(feed);
                    // updateRequest.setQuantity(request.getFeed().getQuantity()-quantity);
                }
                else if(request.getRequestType().equals("Medicine")) {
                    quantity = request.getQuantity();
                    Medicine medicine = medicineRepo.findById(request.getMedicine().getMedicineId()).get();
                    medicine.setQuantity(medicine.getQuantity()-quantity);
                    medicineRepo.save(medicine);
                    // updateRequest.setQuantity(request.getMedicine().getQuantity()-quantity);
                }
            }
            updateRequest.setStatus(request.getStatus());
            return requestRepo.save(updateRequest);
        }
        return null;
    }

    public List<Request> getRequestByStatus() {
        return requestRepo.findByStatus("Hold");
    }

}
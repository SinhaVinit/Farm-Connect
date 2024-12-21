package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.SameNameException;
import com.examly.springapp.model.LiveStock;
import com.examly.springapp.model.Request;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.LiveStockRepo;
import com.examly.springapp.repository.RequestRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class LiveStockServiceImpl implements LiveStockService {
    @Autowired
    LiveStockRepo liveStockRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    RequestRepo requestRepo;

    @Override
    public LiveStock addLiveStock(LiveStock liveStock, int userId) {    // adding Live Stock
        
        // User user = userRepo.findById(userId).get();
        // liveStock.setUser(user);
        // return liveStockRepo.save(liveStock);
        User user = userRepo.findById(userId).get();
        liveStock.setUser(user);
        List<LiveStock> livestockList = liveStockRepo.findByuserId(userId); 
        for (LiveStock x : livestockList) {
            
            if(liveStock.getName().equals(x.getName()) && liveStock.getBreed().equals(x.getBreed()) && liveStock.getSpecies().equals(x.getSpecies())){
                throw new SameNameException("This Livestock already exists!!");
            }
        }
        return liveStockRepo.save(liveStock);
        // return null;
    }

    @Override
    public List<LiveStock> getLiveStockByUserId(int userId) {
        // getting by userId
        return liveStockRepo.findByuserId(userId);
    }

    @Override
    public List<LiveStock> getAllLiveStock() {
        // getting all livestock
        return liveStockRepo.findAll();
    }

    @Override
    public Optional<LiveStock> getLiveStockById(int id) {
        // getting livestock by id
        return liveStockRepo.findById(id);
    }

    @Override
    public LiveStock updateLiveStock(int id, LiveStock updatedLiveStock ,int userId) {
        Optional<LiveStock> optionalLiveStock = liveStockRepo.findById(id);
        if (optionalLiveStock.isPresent()) {
            LiveStock liveStock = optionalLiveStock.get();
            List<LiveStock> livestockList = liveStockRepo.findByuserId(userId);
            // System.out.println("UserId" + userId);
            for (LiveStock x : livestockList) {
                // System.out.println("Inside For");
                if(updatedLiveStock.getName().equals(x.getName()) && updatedLiveStock.getBreed().equals(x.getBreed()) && updatedLiveStock.getSpecies().equals(x.getSpecies()) && liveStock.getLivestockId() != x.getLivestockId()){
                    // System.out.println("Inside If");
                    // System.out.println(x.getLivestockId());
                    // System.out.println(liveStock.getLivestockId());
                    throw new SameNameException("This Livestock already exists!!");
                }
            }
            liveStock.setName(updatedLiveStock.getName());
            liveStock.setSpecies(updatedLiveStock.getSpecies());
            liveStock.setAge(updatedLiveStock.getAge());
            liveStock.setBreed(updatedLiveStock.getBreed());
            liveStock.setHealthCondition(updatedLiveStock.getHealthCondition());
            liveStock.setLocation(updatedLiveStock.getLocation());
            liveStock.setVaccinationStatus(updatedLiveStock.getVaccinationStatus());

            return liveStockRepo.save(liveStock);
        }
        return null;
    }

    @Override
    public boolean deleteLiveStock(int id) {
        // delete livestock by id
        if (liveStockRepo.existsById(id)) {
            List<Request> requests = requestRepo.findByLivestockId(id);
            for(Request request:requests) {
                request.setLivestock(null);
                requestRepo.save(request);
            }
            liveStockRepo.deleteById(id);
            return true;
        }
        return false;
    }

}

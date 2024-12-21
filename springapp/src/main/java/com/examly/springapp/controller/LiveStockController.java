package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exception.SameNameException;
import com.examly.springapp.model.LiveStock;
import com.examly.springapp.service.LiveStockServiceImpl;

@RestController
public class LiveStockController {
    @Autowired LiveStockServiceImpl liveStockService;

    @PostMapping("api/livestock/{userId}")// adding livestock
    public ResponseEntity<?> addLiveStock(@RequestBody LiveStock liveStock, @PathVariable int userId) throws SameNameException,Exception{
        try {
            LiveStock Ls = liveStockService.addLiveStock(liveStock, userId);
            return new ResponseEntity(Ls,HttpStatusCode.valueOf(201));
            
        }catch(SameNameException e){
            return new ResponseEntity(e.getMessage(),HttpStatusCode.valueOf(500));

        } catch (Exception e) {
            return new ResponseEntity(null,HttpStatusCode.valueOf(500));

        }
    }
    @GetMapping("api/livestock/user/{userId}")// getting stocks by User id
    public ResponseEntity<?> getLiveStockByUserId(@PathVariable int userId){
        try {
            List<LiveStock> Ls = liveStockService.getLiveStockByUserId(userId);
            return new ResponseEntity(Ls,HttpStatusCode.valueOf(200));
            
        } catch (Exception e) {
            return new ResponseEntity(null,HttpStatusCode.valueOf(500));

        }
    }
    
    @GetMapping("api/livestock") //getAll livestock
    public ResponseEntity<?> getAllLiveStock(){
        try {
            List<LiveStock> Ls = liveStockService.getAllLiveStock();
            return new ResponseEntity(Ls,HttpStatusCode.valueOf(200));
            
        } catch (Exception e) {
            return new ResponseEntity(null,HttpStatusCode.valueOf(500));

        }
    }
    @GetMapping("api/livestock/{livestockId}") //getting stocks by Id
    public ResponseEntity<?> getLiveStockById(@PathVariable int livestockId){
        try {
            LiveStock Ls = liveStockService.getLiveStockById(livestockId).get();
            return new ResponseEntity(Ls,HttpStatusCode.valueOf(200));
            
        } catch (Exception e) {
            return new ResponseEntity(null,HttpStatusCode.valueOf(500));

        }
    }
    @PutMapping("api/livestock/{livestockId}/{userId}") //updating
    public ResponseEntity<?> updateLiveStock(@PathVariable int livestockId,@RequestBody LiveStock updatedLiveStock,@PathVariable int userId) throws SameNameException,Exception{
        try {
            LiveStock Ls = liveStockService.updateLiveStock(livestockId,updatedLiveStock,userId);
            return new ResponseEntity(Ls,HttpStatusCode.valueOf(200));
            
        } catch(SameNameException e){
            return new ResponseEntity(e.getMessage(),HttpStatusCode.valueOf(500));

        }catch (Exception e) {
            return new ResponseEntity(null,HttpStatusCode.valueOf(500));
        }
    }
    @DeleteMapping("api/livestock/{livestockId}") //deleting
    public ResponseEntity<?> deleteLiveStock(@PathVariable int livestockId){
        try {
            Optional<LiveStock> liveStock = liveStockService.getLiveStockById(livestockId);
            if(liveStock.isPresent()) {
                boolean status = liveStockService.deleteLiveStock(livestockId);
                return new ResponseEntity(liveStock.get(),HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity(null, HttpStatusCode.valueOf(404));
            
        } catch (Exception e) {
            return new ResponseEntity(null,HttpStatusCode.valueOf(500));

        }
    }














}

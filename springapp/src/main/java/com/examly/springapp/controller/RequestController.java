package com.examly.springapp.controller;

import java.util.List;

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

import com.examly.springapp.model.Request;
import com.examly.springapp.service.RequestServiceImpl;

@RestController
public class RequestController {
    @Autowired
    RequestServiceImpl requestServiceImpl;
    @PostMapping("/api/request/{userId}/{feedId}/{medicineId}/{livestockId}")
    public ResponseEntity<?> postMethodForRequest(@RequestBody Request request,@PathVariable int userId,@PathVariable int feedId,@PathVariable int medicineId,@PathVariable int livestockId) {
        try {
            return new ResponseEntity<>(requestServiceImpl.addRequest(request,userId,feedId,medicineId,livestockId), HttpStatusCode.valueOf(201));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(201));
        }
    }

    @GetMapping("/api/request/supplier/view")
    public ResponseEntity<?> getMethodForAllRequest() {
        try {
            List<Request> requests = requestServiceImpl.getAllRequest();
            return new ResponseEntity<>(requests, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }
    @GetMapping("/api/request/supplier/view/{userId}")
    public ResponseEntity<?> getMethodForAllRequest(@PathVariable int userId) {
        try {
            List<Request> requests = requestServiceImpl.getRequestBySupplierId(userId);
            return new ResponseEntity<>(requests, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }
    @GetMapping("/api/request/owner/view/{userId}")
    public ResponseEntity<?> getMethodByUserId(@PathVariable int userId) {
        try {
            List<Request> requests = requestServiceImpl.getAllMyRequest(userId);
            return new ResponseEntity<>(requests, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }
    @PutMapping("/api/request/{requestId}")
    public ResponseEntity<?> putMethodForRegister(@PathVariable int requestId, @RequestBody Request updateRequest) {
        try {
            return new ResponseEntity<>(requestServiceImpl.updateRequest(requestId, updateRequest), HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    } 
    @PutMapping("/api/request/status/{requestId}")
    public ResponseEntity<?> putMethodForRegisterStatusUpdate(@PathVariable int requestId, @RequestBody Request updateRequest) {
        try {
            return new ResponseEntity<>(requestServiceImpl.statusUpdate(requestId, updateRequest), HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    } 
    @DeleteMapping("/api/request/{requestId}")
    public ResponseEntity<?> deleteMethodByUserId(@PathVariable int requestId) {
        try {
            Request request = requestServiceImpl.getRequestById(requestId).get();
            if(request != null) {
                boolean status = requestServiceImpl.deleteRequest(requestId);
            }
            return new ResponseEntity<>(request, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/api/openforum")
    public ResponseEntity<?> getAllRejectedRequest() {
        try {
            return new ResponseEntity<>(requestServiceImpl.getRequestByStatus(), HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }
}

package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int requestId;
    String requestType;
    int quantity;
    String status;
    LocalDate date;

    @ManyToOne
    @JoinColumn(name = "userId")
    User user;

    @ManyToOne
    @JoinColumn(name = "feedId")
    Feed feed;

    @ManyToOne
    @JoinColumn(name = "medicineId")
    Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "livestockId")
    LiveStock livestock;

    public Request(int requestId, String requestType, int quantity, String status, LocalDate date, User user, Feed feed,
            Medicine medicine, LiveStock livestock) {
        this.requestId = requestId;
        this.requestType = requestType;
        this.quantity = quantity;
        this.status = status;
        this.date = date;
        this.user = user;
        this.feed = feed;
        this.medicine = medicine;
        this.livestock = livestock;
    }

    public Request() {
    }

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Feed getFeed() {
        return feed;
    }

    public void setFeed(Feed feed) {
        this.feed = feed;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public LiveStock getLivestock() {
        return livestock;
    }

    public void setLivestock(LiveStock livestock) {
        this.livestock = livestock;
    }

    
}

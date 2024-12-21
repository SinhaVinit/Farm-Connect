package com.examly.springapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class Feed {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int feedId;
    String feedName;
    String type;
    String description;
    String unit;
    double pricePerUnit;
    int quantity;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    byte[] image;

    @ManyToOne
    @JoinColumn(name = "userId")
    User user;

    public Feed(int feedId, String feedName, String type, String description, String unit, double pricePerUnit,
            int quantity, byte[] image, User user) {
        this.feedId = feedId;
        this.feedName = feedName;
        this.type = type;
        this.description = description;
        this.unit = unit;
        this.pricePerUnit = pricePerUnit;
        this.quantity = quantity;
        this.image = image;
        this.user = user;
    }

    public Feed() {
    }

    public int getFeedId() {
        return feedId;
    }

    public void setFeedId(int feedId) {
        this.feedId = feedId;
    }

    public String getFeedName() {
        return feedName;
    }

    public void setFeedName(String feedName) {
        this.feedName = feedName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(double pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
}

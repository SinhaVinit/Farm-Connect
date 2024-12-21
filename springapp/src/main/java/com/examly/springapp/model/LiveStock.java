package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class LiveStock {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int livestockId;
    String name;
    String species;
    int age;
    String breed;
    String healthCondition;
    String location;
    String vaccinationStatus;

    @ManyToOne
    @JoinColumn(name = "userId")
    User user;

    public LiveStock(int livestockId, String name, String species, int age, String breed, String healthCondition,
            String location, String vaccinationStatus, User user) {
        this.livestockId = livestockId;
        this.name = name;
        this.species = species;
        this.age = age;
        this.breed = breed;
        this.healthCondition = healthCondition;
        this.location = location;
        this.vaccinationStatus = vaccinationStatus;
        this.user = user;
    }

    public LiveStock() {
    }

    public int getLivestockId() {
        return livestockId;
    }

    public void setLivestockId(int livestockId) {
        this.livestockId = livestockId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getHealthCondition() {
        return healthCondition;
    }

    public void setHealthCondition(String healthCondition) {
        this.healthCondition = healthCondition;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getVaccinationStatus() {
        return vaccinationStatus;
    }

    public void setVaccinationStatus(String vaccinationStatus) {
        this.vaccinationStatus = vaccinationStatus;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
    
}

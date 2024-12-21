package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Request;

@Repository
public interface RequestRepo extends JpaRepository<Request,Integer>{

    @Query("SELECT r FROM Request r where r.user.userId= :userId" )
    public List<Request> findByUserId(@Param("userId") int userId);

    @Query("SELECT r FROM Request r where r.feed.feedId= :feedId" )
    public List<Request> findByFeedId(@Param("feedId") int feedId);

    @Query("SELECT r FROM Request r where r.medicine.medicineId= :medicineId" )
    public List<Request> findByMedicineId(@Param("medicineId") int medicineId);
    
    @Query("SELECT r FROM Request r where r.livestock.livestockId= :livestockId" )
    public List<Request> findByLivestockId(@Param("livestockId") int livestockId);
    
    public List<Request> findByStatus(String status);

}
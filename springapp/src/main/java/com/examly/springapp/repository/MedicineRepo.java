package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Medicine;

@Repository
public interface MedicineRepo extends JpaRepository<Medicine, Integer> {

    @Query("select m from Medicine m where m.user.userId = :userId")
    List<Medicine> findByUserId(@Param("userId") int userId);

}

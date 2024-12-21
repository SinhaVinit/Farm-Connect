package com.examly.springapp.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.model.Medicine;

public interface MedicineService {

    public Medicine addMedicine(Medicine medicine, int userId, MultipartFile image) throws IOException;

    public Optional<Medicine> getMedicineById(int medicineId);

    public List<Medicine> getAllMedicines();

    public List<Medicine> getMedicineByUserId(int userId);

    public Medicine updateMedicine(int id, Medicine updatedMedicine, int userId, MultipartFile image)
            throws IOException;

    public boolean deleteMedicine(int medicineId);

}

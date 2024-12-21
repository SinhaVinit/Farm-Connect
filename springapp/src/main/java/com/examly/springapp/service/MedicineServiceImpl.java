package com.examly.springapp.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.exception.SameNameException;
import com.examly.springapp.model.Medicine;
import com.examly.springapp.model.Request;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.MedicineRepo;
import com.examly.springapp.repository.RequestRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    MedicineRepo medicineRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    RequestRepo requestRepo;

    @Override
    public Medicine addMedicine(Medicine medicine, int userId, MultipartFile image) throws IOException {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Medicine> medicines = medicineRepo.findByUserId(userId);
        for (Medicine med : medicines) {
            if (med.getMedicineName().equalsIgnoreCase(medicine.getMedicineName()) && med.getBrand().equalsIgnoreCase(medicine.getBrand())) {
                throw new SameNameException("Medicine with this Name and Brand already exists!!");
            }
        }
        medicine.setUser(user);
        medicine.setImage(image.getBytes());
        return medicineRepo.save(medicine);
    }

    @Override
    public Optional<Medicine> getMedicineById(int medicineId) {
        return medicineRepo.findById(medicineId);
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepo.findAll();
    }

    @Override
    public List<Medicine> getMedicineByUserId(int userId) {
        return medicineRepo.findByUserId(userId);
    }

    @Override
    public Medicine updateMedicine(int id, Medicine updatedMedicine, int userId, MultipartFile image) throws IOException {
        if (medicineRepo.existsById(id)) {
            Medicine medicine = medicineRepo.findById(id).orElseThrow(() -> new RuntimeException("Medicine not found"));
            User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            List<Medicine> medicines = medicineRepo.findByUserId(userId);
            for (Medicine med : medicines) {
                if (med.getMedicineName().equalsIgnoreCase(updatedMedicine.getMedicineName()) && med.getBrand().equalsIgnoreCase(updatedMedicine.getBrand()) && med.getMedicineId() != medicine.getMedicineId()) {
                    throw new SameNameException("Medicine with this Name and Brand already exists!!");
                }
            }
            medicine.setMedicineName(updatedMedicine.getMedicineName());
            medicine.setBrand(updatedMedicine.getBrand());
            medicine.setCategory(updatedMedicine.getCategory());
            medicine.setDescription(updatedMedicine.getDescription());
            medicine.setQuantity(updatedMedicine.getQuantity());
            medicine.setUnit(updatedMedicine.getUnit());
            medicine.setPricePerUnit(updatedMedicine.getPricePerUnit());
            medicine.setUser(user);
            if (image != null && !image.isEmpty()) {
                medicine.setImage(image.getBytes());
            }
            return medicineRepo.save(medicine);
        }
        return null;
    }

    @Override
    public boolean deleteMedicine(int medicineId) {
        if (medicineRepo.existsById(medicineId)) {
            List<Request> requests = requestRepo.findByMedicineId(medicineId);
            for(Request request:requests) {
                request.setMedicine(null);
                requestRepo.save(request);
            }
            medicineRepo.deleteById(medicineId);
            return true;
        }
        return false;
    }
}

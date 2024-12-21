package com.examly.springapp.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.exception.SameNameException;
import com.examly.springapp.model.Medicine;
import com.examly.springapp.service.MedicineService;
import com.examly.springapp.service.MedicineServiceImpl;

@RestController
@RequestMapping("/api/medicine")
public class MedicineController {

    @Autowired
    MedicineServiceImpl medicineServiceImpl;

    @PostMapping("/{userId}")
    public ResponseEntity<?> addMedicine(
            @PathVariable int userId,
            @RequestParam String medicineName,
            @RequestParam String brand,
            @RequestParam String category,
            @RequestParam String description,
            @RequestParam int quantity,
            @RequestParam String unit,
            @RequestParam double pricePerUnit,
            @RequestParam("image") MultipartFile image) {
        try {
            Medicine medicine = new Medicine();
            medicine.setMedicineName(medicineName);
            medicine.setBrand(brand);
            medicine.setCategory(category);
            medicine.setDescription(description);
            medicine.setQuantity(quantity);
            medicine.setUnit(unit);
            medicine.setPricePerUnit(pricePerUnit);

            Medicine savedMedicine = medicineServiceImpl.addMedicine(medicine, userId, image);
            return new ResponseEntity<>(savedMedicine, HttpStatusCode.valueOf(201));
        } catch (SameNameException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatusCode.valueOf(409));
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Medicine>> getMedicineById(@PathVariable int id) {
        Optional<Medicine> medicine = medicineServiceImpl.getMedicineById(id);
        try {
            if (medicine.isPresent()) {
                return new ResponseEntity<>(medicine, HttpStatusCode.valueOf(200));
            } else {
                return new ResponseEntity<>(HttpStatusCode.valueOf(500));
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        try {
            List<Medicine> medicines = medicineServiceImpl.getAllMedicines();
            return new ResponseEntity<>(medicines, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Medicine>> getMedicineByUserId(@PathVariable int id) {
        try {
            List<Medicine> medicines = medicineServiceImpl.getMedicineByUserId(id);
            return new ResponseEntity<>(medicines, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @PutMapping("/{medicineId}/{userId}")
    public ResponseEntity<?> updateMedicine(
            @PathVariable int medicineId,
            @RequestParam String medicineName,
            @RequestParam String brand,
            @RequestParam String category,
            @RequestParam String description,
            @RequestParam int quantity,
            @RequestParam String unit,
            @RequestParam double pricePerUnit,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @PathVariable int userId) {
        try {
            Medicine updatedMedicine = new Medicine();
            updatedMedicine.setMedicineName(medicineName);
            updatedMedicine.setBrand(brand);
            updatedMedicine.setCategory(category);
            updatedMedicine.setDescription(description);
            updatedMedicine.setQuantity(quantity);
            updatedMedicine.setUnit(unit);
            updatedMedicine.setPricePerUnit(pricePerUnit);

            Medicine updated = medicineServiceImpl.updateMedicine(medicineId, updatedMedicine, userId, image);
            if (updated != null) {
                return new ResponseEntity<>(updated, HttpStatusCode.valueOf(200));
            } else {
                return new ResponseEntity<>(HttpStatusCode.valueOf(404));
            }
        } catch (SameNameException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatusCode.valueOf(409));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @DeleteMapping("/{medicineId}")
    public ResponseEntity<Medicine> deleteMedicine(@PathVariable int medicineId) {
        try {
            Optional<Medicine> medicine = medicineServiceImpl.getMedicineById(medicineId);
            if (medicine.isPresent()) {
                boolean isDeleted = medicineServiceImpl.deleteMedicine(medicineId);
                return new ResponseEntity<>(medicine.get(), HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable int id) {
        Optional<Medicine> medicine = medicineServiceImpl.getMedicineById(id);
        if (medicine.isPresent() && medicine.get().getImage() != null) {
            byte[] image = medicine.get().getImage();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"image.jpg\"")
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(image);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
}

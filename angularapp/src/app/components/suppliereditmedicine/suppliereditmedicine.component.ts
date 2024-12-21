import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-suppliereditmedicine',
  templateUrl: './suppliereditmedicine.component.html',
  styleUrls: ['./suppliereditmedicine.component.css']
})
export class SuppliereditmedicineComponent implements OnInit {
  medicineForm: FormGroup;
  selectedMedicineId: string;
  selectedFile: File;
  constructor(private formBuilder: FormBuilder, private medicineService: MedicineService, private modalService: NgbModal, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.medicineForm = this.formBuilder.group({
      medicineName: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      pricePerUnit: ['', [Validators.required, Validators.min(0.01)]],
      image: ['']
    })
    this.selectedMedicineId = this.route.snapshot.paramMap.get("id");

    this.medicineService.getMedicineById(this.selectedMedicineId).subscribe((data: Medicine) => {
      this.medicineForm.patchValue({
        medicineName: data.medicineName,
        brand: data.brand,
        category: data.category,
        description: data.description,
        quantity: data.quantity,
        unit: data.unit,
        pricePerUnit: data.pricePerUnit
      });
    });
  }

  cancelEdit(){
    this.medicineForm.reset()
    this.router.navigate(['/medicine/supplier/view'])
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    this.medicineForm.patchValue({ image: this.selectedFile });
  }

  updateMedicine(content,errorContent) {
    if (this.medicineForm.valid) {
      const formData = new FormData();
      Object.keys(this.medicineForm.controls).forEach(key => {
        if (key === 'image') {
          formData.append(key, this.selectedFile);
        } else {
          formData.append(key, this.medicineForm.get(key).value);
        }
      });
      this.medicineService.updateMedicine(this.selectedMedicineId, formData, +localStorage.getItem('userId')).subscribe((data) => {
        this.medicineForm.reset()
        this.modalService.open(content);
        this.router.navigate(['/medicine/supplier/view'])
      }, (error) => {
        this.modalService.open(errorContent)
        console.log(error)
      })
    }
  }
}

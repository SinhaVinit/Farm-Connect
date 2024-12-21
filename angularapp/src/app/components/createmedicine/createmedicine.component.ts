import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-createmedicine',
  templateUrl: './createmedicine.component.html',
  styleUrls: ['./createmedicine.component.css']
})
export class CreatemedicineComponent implements OnInit {
  medicineForm: FormGroup;
  selectedFile: File;
  @ViewChild('fileInput') fileInput: ElementRef;
  imageClicked:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private medicineService: MedicineService,
    private modalService: NgbModal,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.medicineForm = this.formBuilder.group({
      medicineName: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      pricePerUnit: ['', [Validators.required, Validators.min(0.01)]],
      image: ['',Validators.required]
    });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    this.medicineForm.patchValue({ image: this.selectedFile });
  }

  imageClick(){
    this.imageClicked = true
  }

  addMedicine(content,errorContent): void {
    if (this.medicineForm.valid) {
      const formData = new FormData();
      Object.keys(this.medicineForm.controls).forEach(key => {
        if (key === 'image') {
          formData.append(key, this.selectedFile);
        } else {
          formData.append(key, this.medicineForm.get(key).value);
        }
      });

      this.medicineService.addMedicine(formData).subscribe(
        (data) => {
          console.log(data);
          this.medicineForm.reset();
          this.imageClicked = false;
          this.fileInput.nativeElement.value = ''; // Clear the file input
          this.modalService.open(content).result.then((result) => {
            if (result === 'view') {
              this.router.navigate(['/medicine/supplier/view'])
              console.log(result);
            }
          }, (reason) => {
            console.log('Dismissed', reason);
          });
        }, (error) => {
          this.modalService.open(errorContent)
          console.log(error)
        }
      );
    }
  }
}

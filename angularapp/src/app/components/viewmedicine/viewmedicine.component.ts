import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-viewmedicine',
  templateUrl: './viewmedicine.component.html',
  styleUrls: ['./viewmedicine.component.css']
})
export class ViewmedicineComponent implements OnInit {
  medicines: Medicine[] = [];
  searchQuery: string = "";
  imageUrl: string;
  selectedMedicineId:number;
  isDeleteVisible = false;
  isImageVisible = false;

  constructor(private modalService: NgbModal, private medicineService: MedicineService, private router: Router) { }

  ngOnInit(): void {
    this.medicineService.getMedicineByUserID(+localStorage.getItem('userId')).subscribe((data) => {
      this.medicines = data;
    })
  }
  // confirmDelete(medicineId: string, content) {
  //   const options: NgbModalOptions = {
  //     backdrop: 'static',
  //     keyboard: false
  //   };
  //   this.modalService.open(content, options).result.then((result) => {
  //     if (result === 'delete') {
  //       this.deleteMedicine(medicineId)
  //       console.log('Modal closed with:', result);
  //     }
  //   }, (reason) => {
  //     console.log('Dismissed', reason);
  //   });
  // }

  filterMedicine() {
    this.medicineService.searchMedicine(this.searchQuery).subscribe((data) => {
      this.medicines = data
    })
  }

  deleteMedicine() {
    this.medicineService.deleteMedicine(this.selectedMedicineId).subscribe((data) => {
      console.log(data)
      this.ngOnInit();
      this.closeDeleteModal();
    })
  }

  editMedicine(medicineId: string) {
    // {path:"medicine/supplier/edit/:id",component:SuppliereditmedicineComponent}
    this.router.navigate(['/medicine/supplier/edit', medicineId])
  }

  loadImage(id: number): void {
    this.medicineService.getImage(id).subscribe((blob) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        console.log(this.imageUrl)
      };
      reader.readAsDataURL(blob);
      this.isImageVisible = true;
    });
  }

  // openImageModal(content, medicineId) {
  //   const options: NgbModalOptions = {
  //     backdrop: 'static',
  //     keyboard: false
  //   };
  //   this.loadImage(medicineId);
  //   this.modalService.open(content, options).result.then((result) => {
  //     console.log('Modal closed with:', result);
  //   }, (reason) => {
  //     console.log('Dismissed', reason);
  //   });
  // }

  openDeleteModel(medicineId:number) {
    this.selectedMedicineId = medicineId;
    this.isDeleteVisible = true;
  }
  openImageModel(medicineId:number) {
    this.loadImage(medicineId);
    // this.isImageVisible = true;
  }

  closeDeleteModal() {
    this.isDeleteVisible = false;
  }
  closeImageModal() {
    this.isImageVisible = false;
  }

}
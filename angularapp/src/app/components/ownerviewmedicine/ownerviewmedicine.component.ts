import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-ownerviewmedicine',
  templateUrl: './ownerviewmedicine.component.html',
  styleUrls: ['./ownerviewmedicine.component.css']
})
export class OwnerviewmedicineComponent implements OnInit {

  medicines:Medicine[] = [];
  searchQuery:string = "";
  constructor(private medicineService:MedicineService,private router:Router) { }

  ngOnInit(): void {
    this.medicineService.getAllMedicine().subscribe((data)=>{
      this.medicines = data;
    })
  }

  filterMedicine(){
    this.medicineService.searchMedicineForOwner(this.searchQuery).subscribe((data)=>{
      this.medicines = data
    })
  }

  requestMedicine(medicineId,medicineName){
    this.router.navigate(["/request/owner/",medicineId,medicineName,"Medicine"]);
  }

}
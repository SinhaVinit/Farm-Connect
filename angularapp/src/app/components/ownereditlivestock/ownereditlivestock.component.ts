import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Livestock } from 'src/app/models/livestock.model';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-ownereditlivestock',
  templateUrl: './ownereditlivestock.component.html',
  styleUrls: ['./ownereditlivestock.component.css']
})
export class OwnereditlivestockComponent implements OnInit {
  editLivestock: FormGroup;
  formSubmitted: boolean = false;
  editId: number;
  msg: boolean = false;
  newMessage: string = '';
  userId = +localStorage.getItem('userId');

  livestock: Livestock = {
    name: "",
    species: "",
    age: 0,
    breed: "",
    location: "",
    vaccinationStatus: "",
    healthCondition: ""
    // livestockId: 0
  };

  
  constructor(private formBuilder: FormBuilder, private livestockservice: LivestockService, private router: Router, private route: ActivatedRoute, private modal: NgbModal) {
    this.editId = +this.route.snapshot.params['id'];
    console.log(this.editId);
    this.editLivestock = this.formBuilder.group({
      name: ["", Validators.required],
      species: ["", Validators.required],
      age: ["", [Validators.required, Validators.min(1)]],
      breed: ["", Validators.required],
      location: ["", Validators.required],
      vaccinationStatus: ["", Validators.required],
      healthCondition: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.editLivestock = this.formBuilder.group({
      name: ["", Validators.required],
      species: ["", Validators.required],
      age: ["", [Validators.required, Validators.min(1)]],
      breed: ["", Validators.required],
      location: ["", Validators.required],
      vaccinationStatus: ["", Validators.required],
      healthCondition: ["", Validators.required]
    });
    this.editId = +this.route.snapshot.params['id'];
    this.livestockservice.getLivestockByID(this.editId).subscribe((data) => {
      this.livestock = data;
      this.editLivestock.patchValue({
        name: data.name,
        species: data.species,
        age: data.age,
        breed: data.breed,
        location: data.location,
        vaccinationStatus: data.vaccinationStatus,
        healthCondition: data.healthCondition
      })

    });
  }

  public updateLivestock() {
    this.livestockservice.updateLivestock(this.editId, this.editLivestock.value).subscribe((data) => {
      this.livestock = data;
      this.msg = true;
      this.newMessage = "Successfully updated.";
    }, (error1) => {
      console.log(error1);
      this.msg = true;
      this.newMessage = error1.error;
    });
    // this.livestockservice.getLivestockAll();
  }

  public goBack() {
    console.log("going Back!!");
    this.router.navigate(['/livestock/owner/view']);
  }



  // okayButton(){

  //   this.editLivestock.reset();
  // }

  closeModel() {
    this.msg = false;
    this.editLivestock.reset();
  }



}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-createlivestock',
  templateUrl: './createlivestock.component.html',
  styleUrls: ['./createlivestock.component.css']
})
export class CreatelivestockComponent implements OnInit {
  createLivestockForm:FormGroup;
  formSubmitted:boolean = false;
  newMessage:string = '';
  msg:boolean = false;


  constructor(private formBuilder:FormBuilder,private livestockService:LivestockService) { 
    this.createLivestockForm = this.formBuilder.group({
      name:["",Validators.required],
      species:["",Validators.required],
      age:["",[Validators.required,Validators.min(1)]],
      breed: ["",Validators.required], 
      location:["",Validators.required],
      vaccinationStatus:["",Validators.required],
      healthCondition:["",Validators.required]
    });
  }

  ngOnInit(): void {
   this.createLivestockForm = this.formBuilder.group({
      name:["",Validators.required],
      species:["",Validators.required],
      age:["",[Validators.required,Validators.min(1)]],
      breed: ["",Validators.required], 
      location:["",Validators.required],
      vaccinationStatus:["",Validators.required],
      healthCondition:["",Validators.required]
      // userId: ,
    });

  }

  public addLivestock(){
    this.formSubmitted = true;
    if(this.createLivestockForm.valid){
    this.livestockService.addLivestock(this.createLivestockForm.value).subscribe((data)=>{
      console.log(data);
      this.msg = true;
      this.formSubmitted = false;
      this.newMessage = "Successfully added.";
      
    },(error1) => {
      console.log(error1);
      this.msg = true;
      this.newMessage = error1.error;
    });
  }

    
  }

  closeModel(){
    this.msg = false;
    this.createLivestockForm.reset();
  }

}

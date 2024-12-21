import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livestock } from 'src/app/models/livestock.model';
import { LivestockService } from 'src/app/services/livestock.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})
export class RequestformComponent implements OnInit {
  requestForm:FormGroup;
  userId: number = +localStorage.getItem('userId');
  feedId: number = 0;
  medicineId: number = 0;
  requestType: string = '';
  feedName: string = '';
  medicineName: string = '';
  quantity: number = 1;
  liveStocks:Livestock[]=[];

  constructor(private activatedRoute: ActivatedRoute,private livestockService:LivestockService,private requestService:RequestService,private formBuilder:FormBuilder,private router:Router) {
    this.requestForm = formBuilder.group({
      requestType: ["", Validators.required],
      // livestock: [Validators.required],
      feedName: [""], // Optional, only required if requestType is 'Feed'
      medicineName: [""], // Optional, only required if requestType is 'Medicine'
      quantity: ["", [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {
    this.medicineId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.medicineName = this.activatedRoute.snapshot.paramMap.get('name');
    this.requestType = this.activatedRoute.snapshot.paramMap.get('type');
    this.feedId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.feedName = this.activatedRoute.snapshot.paramMap.get('name');
    console.log("feed name " , this.feedName)
    this.requestType = this.activatedRoute.snapshot.paramMap.get('type');
    this.livestockService.getLivestockByUserID(this.userId).subscribe((data)=>{
      this.liveStocks=data;
    });
  }

  public addNewRequest() {
    
    console.log("form data " , this.requestForm.value  , this.userId,this.feedId,this.medicineId,this.selectedLivestockId );

    this.requestService.addRequest( this.userId,this.feedId,this.medicineId,this.selectedLivestockId,this.requestForm.value).subscribe((data)=>{
      console.log("return data " , data);
      this.router.navigate(["/request/owner/view"])
    });
    console.log("request sent successfully");
    // this.router.navigate(["/request/owner/",feedId,feedName,"Feed"])

  }

  public cancelRequest() {
    // Handle form cancellation
    if (this.requestType === "Feed") {
      this.router.navigate(['/feed/owner/view']);
    }
    else if (this.requestType == "Medicine"){
      this.router.navigate(['medicine/owner/view']);
    }
  }
  selectedLivestockName: string = "";
  selectedLivestockId: number | null = null;
  SaveLivestockID(selectedId): void {
    this.selectedLivestockId = +selectedId;
    console.log("Selected Livestock ID: ", this.selectedLivestockId);
    console.log("type of selectedLivestockId ",typeof(this.selectedLivestockId));
  }
}

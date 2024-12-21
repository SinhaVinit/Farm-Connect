import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Livestock } from 'src/app/models/livestock.model';
import { Request } from 'src/app/models/request.model';
import { LivestockService } from 'src/app/services/livestock.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-ownerviewrequest',
  templateUrl: './ownerviewrequest.component.html',
  styleUrls: ['./ownerviewrequest.component.css']
})
export class OwnerviewrequestComponent implements OnInit {
  userId: number = +localStorage.getItem('userId');
  constructor(private requestService: RequestService, private livestockService: LivestockService) { }
  requests: Request[] = [];
  edit: boolean = false;
  livestocks: Livestock[] = [];
  quantity: number = 0;
  ngOnInit(): void {
    this.requestService.getRequestsByUserId(this.userId).subscribe((data) => {
      this.requests = data;
    })
    console.log(this.requests);
  }
  deleteRequest(id: number) {
    this.requestService.deleteRequest(id).subscribe();
    this.requestService.getRequestsByUserId(this.userId).subscribe((data) => {
      this.requests = data;
    })
  }
  editQuantity:number;
  editRequestType:string;
  // editMedicineFeedType:string
  requestForSave:Request;
  editRequest(request: Request) {
    this.requestForSave = request
    this.editQuantity = request.quantity;
    this.editRequestType = request.requestType;
    this.edit = true;
  }
  close() {
    this.edit = false;
  }
  save() {
    this.requestForSave.quantity = this.editQuantity;
    this.requestService.updateRequest(this.requestForSave.requestId, this.requestForSave).subscribe((data) => {
      this.edit = false;
    });
  }
}

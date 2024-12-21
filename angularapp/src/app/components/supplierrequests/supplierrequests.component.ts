import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-supplierrequests',
  templateUrl: './supplierrequests.component.html',
  styleUrls: ['./supplierrequests.component.css']
})
export class SupplierrequestsComponent implements OnInit {
  requests: Request[] = [];
  constructor(private requestService: RequestService) { }
  ngOnInit(): void {
    console.log("before request :", this.requests)
    this.requestService.getAllMyRequests(+localStorage.getItem('userId')).subscribe((data) => {
      this.requests = data;
      console.log(this.requests);
    })
  }
  approveStatus(request: Request) {
    request.status = "Approved";
    this.requestService.statusUpdate(request.requestId, request).subscribe();
  }
  rejectStatus(request:Request) {
    request.status="Rejected";
    this.requestService.statusUpdate(request.requestId, request).subscribe();
  }
  holdStatus(request:Request) {
    request.status="Hold";
    this.requestService.statusUpdate(request.requestId, request).subscribe();
  }

}

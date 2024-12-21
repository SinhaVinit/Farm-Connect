import { Component, OnInit } from '@angular/core';
import { OpenforumService } from 'src/app/services/openforum.service';

@Component({
  selector: 'app-openforum',
  templateUrl: './openforum.component.html',
  styleUrls: ['./openforum.component.css']
})
export class OpenforumComponent implements OnInit {

  requests: Request[] = [];
  isOpen: boolean = false;
  request:Request;

  constructor(private openForumService: OpenforumService) {
    this.getAllRejectedRequest();
  }

  ngOnInit(): void {
    this.getAllRejectedRequest();
  }

  getAllRejectedRequest() {
    this.openForumService.getRejectedRequest().subscribe((data) => {
      this.requests = data;
      console.log(data);
    })
  }

  onAccept(request:Request) {
    this.request = request;
    this.isOpen = true;
  }

  closeModel() {
    this.isOpen = false;
  }

}

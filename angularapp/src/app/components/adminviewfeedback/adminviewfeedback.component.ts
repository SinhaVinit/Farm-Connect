import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  feedback:Feedback = {
    feedbackText: '',
    date: undefined
  }
  status=false;
  isOpen = false;

  @ViewChild('successModal', { static: true }) successModal: TemplateRef<any>;

  modalRef:NgbModalRef;

  constructor(private feedbackService: FeedbackService,private modal: NgbModal) {

  }

  ngOnInit(): void {
    this.getFeedbacksFromAllUsers();
  }

  getFeedbacksFromAllUsers() {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      this.feedbacks = data;
    })
  }

  showProfile(id:number){
    this.status = true;
    // this.modalRef = this.modal.open(this.successModal);
    this.feedbacks.forEach((selectedFeedback) => {
      if(selectedFeedback.feedbackId === id){
        this.feedback = selectedFeedback;
      }
    });
    this.isOpen = true;
  }
  
  // closeProfile(){

  //   this.modalRef.close();

  // }

  close() {
    this.isOpen = false;
  }

}

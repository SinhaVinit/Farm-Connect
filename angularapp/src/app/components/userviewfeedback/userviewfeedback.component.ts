import { Component, OnInit, } from '@angular/core';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];

  currentId: number = null;
  feedbackId: number = null;
  isDeleteVisible: boolean = false;
  isEditVisible: boolean = false;

  feedback: Feedback = {
    feedbackText: '',
    date: undefined
  }


  userId: number = +localStorage.getItem('userId');

  constructor(private feedbackService: FeedbackService, private modalService: NgbModal) {
    this.getAllFeedbacksByUserId();
  }

  ngOnInit(): void {
    this.getAllFeedbacksByUserId();
  }

  getAllFeedbacksByUserId() {
    this.feedbackService.getAllFeedbacksByUserId(this.userId).subscribe((data) => {
      this.feedbacks = data;
      console.log(data);
    })
  }


  // updateFeedbackById(){
  //   this.feedbackService.updateFeedback(this.feedbackId,this.feedback).subscribe((data)=>{
  //     console.log("updated");
  //     this.closeButton();
  //   })
  // }

  openDeleteModal(id: number) {
    this.currentId = id;
    this.isDeleteVisible = true;
  }


  confirmDelete() {
    this.feedbackService.deleteFeedback(this.currentId).subscribe((data) => {
      this.getAllFeedbacksByUserId();
      this.closeDeleteModal();
    })
  }

  closeDeleteModal() {
    this.isDeleteVisible = false;
  }

  openUpdateModal(getFeedback) {
    this.feedback = getFeedback;
    this.feedbackId = getFeedback.feedbackId;
    this.isEditVisible = true;
  }

  confirmUpdate() {
    this.feedbackService.updateFeedback(this.feedbackId, this.feedback).subscribe((data) => {
      this.getAllFeedbacksByUserId();
      this.closeEditModal();
    })
    this.feedbackId = null;
  }

  closeEditModal() {
    this.isEditVisible = false;
  }

}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedbackForm:FormGroup;
  feedbacks:Feedback[]=[];
  msg: boolean = false;
  newMessage: string;

  // @ViewChild('successModal', { static: true }) successModal: TemplateRef<any>;

  // modalRef:NgbModalRef;

  constructor(private feedbackService:FeedbackService,private formBuilder:FormBuilder/*,private modal: NgbModal*/ ) { }

  ngOnInit(): void {
    this.feedbackForm=this.formBuilder.group({
      feedbackText :["",[Validators.required,Validators.minLength(10),Validators.maxLength(100)]],
      date:[new Date()]
    })
    // console.log(new Date());
  }

 
addNewFeedback() {
  if(this.feedbackForm.valid){
    this.feedbackService.addFeedback(this.feedbackForm.value).subscribe((data) => {
      console.log(data);
      this.feedbacks.push(data); 
      this.msg = true;
      this.newMessage ="Successfully Added!";

    });
  }
}

  // // submitButton(){
  // //   console.log("submitted");
  //   // this.modalRef = this.modal.open(this.successModal);
  //   // setTimeout(()=>{
  //   //   this.modalRef.close();
  //   // },2000);
  // }
  // // okayButton(){
    
  //   // this.modalRef.close();
  // //   this.feedbackForm.reset();
  // // }

  public get f(){
    return this.feedbackForm.controls;
  }


  closeModel(){
    this.msg = false;
    this.feedbackForm.reset();
  }
}



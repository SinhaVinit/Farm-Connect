import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-createfeed',
  templateUrl: './createfeed.component.html',
  styleUrls: ['./createfeed.component.css']
})
export class CreatefeedComponent implements OnInit {
  createFeedForm:FormGroup
  selectedFile: File
  imageClicked:boolean=false
  @ViewChild('fileInput') fileInput:ElementRef
  constructor(private builder:FormBuilder,private feedService:FeedService,private router:Router,private modalService:NgbModal) {}
  ngOnInit(): void {
    this.createFeedForm=this.builder.group({
      feedName:["",Validators.required],
      type:["",Validators.required],
      description:["",Validators.required],
      quantity: ["", [Validators.required, Validators.min(1)]],
      unit: ["", [Validators.required]],
      pricePerUnit: ['', [Validators.required, Validators.min(0.01)]],
      image:["",Validators.required]  
    })
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    console.log(`User ID: ${userId}, Username: ${username}`);
    console.log('Form Value:', this.createFeedForm.value); 
  }
  onFileSelected(event):void { 
    this.selectedFile = event.target.files[0];
    this.createFeedForm.patchValue({ image: this.selectedFile });
  }
  // createNewFeed(content){
  //   console.log('in')
  //     this.feedService.addFeed(this.createFeedForm.value).subscribe((arg)=>console.log(arg));      
  //       this.createFeedForm.reset()
  //           this.modalService.open(content);

  // }
  imageClick(){
    this.imageClicked=true
  }
  createNewFeed(content,errorContent){
    if (this.createFeedForm.valid) {
      const formData = new FormData();
      Object.keys(this.createFeedForm.controls).forEach(key => {
        if (key === 'image') {
          formData.append(key, this.selectedFile);
        } else {
          formData.append(key, this.createFeedForm.get(key).value);
        }
      });

      this.feedService.addFeed(formData).subscribe(
        (data) => {
          console.log(data);
          this.createFeedForm.reset();
          this.imageClicked=false
          this.fileInput.nativeElement.value="";
          this.modalService.open(content);
        }, (error) => {this.modalService.open(errorContent);
        }
      );
    }
  }
    
  
  toView(modal){
    this.router.navigate(['feed/supplier/view'])
    modal.close();
  }
  ok(modal){
    modal.close();
  }
  get feedName() {
    return this.createFeedForm.get('feedName');
  }

  get type() {
    return this.createFeedForm.get('type');
  }

  get description() {
    return this.createFeedForm.get('description');
  }

  get quantity() {
    return this.createFeedForm.get('quantity');
  }

  get unit() {
    return this.createFeedForm.get('unit');
  }

  get pricePerUnit() {
    return this.createFeedForm.get('pricePerUnit');
  }

  get image() {
    return this.createFeedForm.get('image');
  }

}


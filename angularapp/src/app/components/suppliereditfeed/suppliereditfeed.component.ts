import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Feed } from 'src/app/models/feed.model';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-suppliereditfeed',
  templateUrl: './suppliereditfeed.component.html',
  styleUrls: ['./suppliereditfeed.component.css']
})
export class SuppliereditfeedComponent implements OnInit {
  editForm:FormGroup
  selectedFeedId: string;
  selectedFile:File
  constructor(private builder:FormBuilder,private route:ActivatedRoute,private feedService:FeedService, private router:Router,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.editForm=this.builder.group({
      feedName:["",Validators.required],
      type:["",Validators.required],
      description:["",Validators.required],
      quantity: ["", [Validators.required, Validators.min(1)]],
      unit: ["", [Validators.required]],
      pricePerUnit: ['', [Validators.required, Validators.min(0.01)]],
      image:[""]
    })


    this.selectedFeedId= this.route.snapshot.paramMap.get("id");
    this.feedService.getFeedById(this.selectedFeedId).subscribe((data: Feed) => {
      this.editForm.patchValue({
        feedName: data.feedName,
        type:data.type,
        description:data.description,
        quantity:data.quantity,
        unit:data.unit,
        pricePerUnit:data.pricePerUnit
      });
      console.log(this.editForm.value)
    });
  
  }
  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    this.editForm.patchValue({ image: this.selectedFile });
  }

  updateFeed(content,errorContent) {
    if (this.editForm.valid) {
      const formData = new FormData();
      Object.keys(this.editForm.controls).forEach(key => {
        if (key === 'image') {
          formData.append(key, this.selectedFile);
        } else {
          formData.append(key, this.editForm.get(key).value);
        }
      });

      this.feedService.updateFeed(this.selectedFeedId, formData, +localStorage.getItem('userId')).subscribe((data) => {
        this.editForm.reset()
        this.modalService.open(content)

        this.router.navigate(['/feed/supplier/view'])
      },(error) => {console.log(error)
        this.modalService.open(errorContent)
      })

    }

  }
  cancel(){
    this.editForm.reset();
    this.router.navigate(['/feed/supplier/view'])
}

  toView(modal){
    this.router.navigate(['feed/supplier/view'])
    modal.close();
  }

  ok(modal){
    modal.close();
  }

  get feedName() {
    return this.editForm.get('feedName');
  }

  get type() {
    return this.editForm.get('type');
  }

  get description() {
    return this.editForm.get('description');
  }

  get quantity() {
    return this.editForm.get('quantity');
  }

  get unit() {
    return this.editForm.get('unit');
  }

  get pricePerUnit() {
    return this.editForm.get('pricePerUnit');
  }

  get image() {
    return this.editForm.get('image');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Feed } from 'src/app/models/feed.model';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-viewfeed',
  templateUrl: './viewfeed.component.html',
  styleUrls: ['./viewfeed.component.css']
})
export class ViewfeedComponent implements OnInit {
feeds:Feed[]=[]
search:string=""
selectedFeedId: string
isDeleteVisible = false;
isImageVisible = false;

  image:string
  imageUrl: string;
  constructor(private feedService:FeedService,private modalService: NgbModal,private router:Router) {
    this.feedService.getFeedByUserID(+localStorage.getItem('userId')).subscribe((args)=>this.feeds=args);
  }
  ngOnInit(): void {
    this.feedService.getFeedByUserID(+localStorage.getItem('userId')).subscribe((args)=>this.feeds=args);
  }
  edit(id:number){
    this.router.navigate(['/feed/supplier/edit/'+id])
  }

  showImage(id: number): void {
    this.feedService.getImage(id).subscribe((blob) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        console.log(this.imageUrl)
      };
      reader.readAsDataURL(blob);
      this.isImageVisible = true;
    });
  }

  // showImage(content,id:number){
  //   // this.modalService.open(content);
  //   this.loadImage(id);
  //   console.log(this.feeds);  
  // }
  searchFn(){
    console.log(this.search)
    this.feedService.searchfilter(this.search).subscribe((args)=>this.feeds=args);  
    console.log(this.feeds)
  }
  // openDeleteModal(content, feedId: string) {
  openDeleteModal(feedId: string) {
    console.log(feedId)
    this.selectedFeedId = feedId;
    console.log(this.selectedFeedId);
    this.isDeleteVisible = true;
    // this.modalService.open(content);
  }

  confirmDelete() {
  // confirmDelete(modal) {
    // this.feeds = this.feeds.filter(feed => feed.feedId !== parseInt(this.selectedFeedId));
    console.log(this.selectedFeedId)
    this.feedService.deleteFeed(this.selectedFeedId).subscribe((data) => {
      this.ngOnInit(); 
      this.closeDeleteModal();
    });
    // this.feedService.getAllFeed().subscribe((args)=>this.feeds=args); 
    // modal.close();

  }

  closeDeleteModal() {
    this.isDeleteVisible = false;
  }
  closeImageModal() {
    this.isImageVisible = false;
  }

}

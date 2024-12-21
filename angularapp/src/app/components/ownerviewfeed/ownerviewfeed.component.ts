import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feed } from 'src/app/models/feed.model';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-ownerviewfeed',
  templateUrl: './ownerviewfeed.component.html',
  styleUrls: ['./ownerviewfeed.component.css']
})
export class OwnerviewfeedComponent implements OnInit {
  search:string="";
  feeds:Feed[]=[];
  constructor(private feedService:FeedService, private router:Router) { 
  }
  ngOnInit(): void {
    this.feedService.getAllFeed().subscribe((args)=>this.feeds=args);  
  }
  searchFn(){
    console.log(this.search)
    this.feedService.searchfilterForOwner(this.search).subscribe((args)=>this.feeds=args);  
    console.log(this.feeds)  
  }
  requestFeed(feedId,feedName){
    this.router.navigate(["/request/owner/",feedId,feedName,"Feed"])
    
  }
}

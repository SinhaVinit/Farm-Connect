import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livestock } from 'src/app/models/livestock.model';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-viewlivestock',
  templateUrl: './viewlivestock.component.html',
  styleUrls: ['./viewlivestock.component.css']
})
export class ViewlivestockComponent implements OnInit {
  livestocks:Livestock[]=[];
  livestock:Livestock;
  search:string;
  isDeleteVisible:boolean = false;
  deleteId:number = null;
  constructor( private livestockService:LivestockService,private router:Router) { }

  ngOnInit(): void {
    
    this.getAllById();

  }

 
  public getAllById(){
    this.livestockService.getLivestockByUserID(+localStorage.getItem('userId')).subscribe((data)=>{
      this.livestocks = data;
    });
  }
  // public getAllLivestockByUserId(){
  //   this.livestockService.getLivestockByUserID(user.id).subscribe((data)=>{
  //     this.livestocks = data;
  //   });
  // }

   public editLivestock(id:number){ 
    this.router.navigate(['/livestock/owner/edit',id]);
    // console.log("Edited!!");
   }
   public deleteLivestock(){ 
    this.livestockService.deleteLivestock(this.deleteId).subscribe((data)=>{
      this.getAllById();
      console.log("Deleted!!");
      this.closeDeleteModal();
    });
  }
  searchFn(){
    console.log(this.search)
    this.livestockService.searchfilter(this.search).subscribe((args)=>this.livestocks=args);  
    console.log(this.livestocks);
  }

  openDeleteModal(livestockId:number) {
    this.deleteId = livestockId;
    this.isDeleteVisible = true;
  }
  closeDeleteModal() {
    this.isDeleteVisible = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userRole:string;
  
  constructor(private router:Router) {
    this.userRole = localStorage.getItem('role');
    console.log(this.userRole);
  }

  ngOnInit(): void {
  }
  signUp(){
      this.router.navigate(['/registration'])
  }

}

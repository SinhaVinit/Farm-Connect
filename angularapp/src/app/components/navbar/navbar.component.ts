import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role:string = localStorage.getItem('role');
  loggedOut = false;
  navProperty = false;

  constructor(private navbarService:NavbarService, private router:Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.navProperty$.subscribe(status => {
      this.navProperty = status;
      this.role = localStorage.getItem('role');
      // if(status) {
      // }
      // else {
      //   this.role = localStorage.getItem('role');
      // }
    });
  }

  logout(loggedOut:boolean) {
    if(loggedOut === true) {
      
      localStorage.clear();
      this.authService.normalNav();
      this.router.navigate(['/login']);
      loggedOut = false;

      // setTimeout(()=>{
      //   location.reload();
      // },500);
      
    }
  }

}

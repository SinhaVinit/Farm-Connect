import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  @Input() role: string;
  @Output() loggedOut = new EventEmitter<boolean>();
  username:string = localStorage.getItem('username');
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.loggedOut.emit(true);
  }

}

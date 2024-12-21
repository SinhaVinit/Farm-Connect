import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  // getTokenToSend() {
  //   const token = localStorage.getItem('Token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const options = {headers: headers};
  //   return options;
  // }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${username}`);
  }
}

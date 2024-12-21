import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
 
 
@Injectable({
  providedIn: 'root'
})
 
 
export class AuthService {
 
  public apiUrl = environment.apiUrl;
 
  private currentUserRole = new BehaviorSubject<string>(null);
  private currentUserId = new BehaviorSubject<number>(null);
 
  // isLoggedIn: any;
 
  constructor(private http: HttpClient) { }
 
 
  public register(user: User): Observable<any> {
    console.log(user)
    return this.http.post<any>(`${this.apiUrl}/api/register`, user, {responseType: 'text' as 'json' });
  }
 
  public welcome() {
    return this.http.get(`${this.apiUrl}/welcome`);
  }
 
  // public login(login: { email: string, password: string }): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/api/login`, login).pipe(
  //     map(response => {
  //       if (response.token) {
  //         localStorage.setItem('jwtToken', response.token);
  //         this.currentUserRole.next(response.userRole);
  //         this.currentUserId.next(response.userId);
  //       }
  //       return response;
  //     })
  //   );
  // }
  public login(login):Observable<any>{
    console.log(login);
    return this.http.post(`${this.apiUrl}/api/login`,login,{ responseType: 'text' });
  }

  getUserRole(): Observable<string> {
    return this.currentUserRole.asObservable();
  }
 
  getUserId(): Observable<number> {
    return this.currentUserId.asObservable();
  }
 
  logout(): void {
    // localStorage.removeItem('jwtToken');
    localStorage.removeItem('Token');

    this.currentUserRole.next(null);
    this.currentUserId.next(null);
  }
  getWelcome(): Observable<string> {
    return this.http.get(this.apiUrl + "/welcome", { responseType: "text" })
  }

  isLoggedIn(): boolean {
    // Replace with real authentication check
    return !!localStorage.getItem('token');
  }

  isSupplier(): boolean {
    const role = localStorage.getItem('role');
    if(role === "SUPPLIER") {
      return true;
    }
    return false;
  }
  
  isOwner(): boolean {
    const role = localStorage.getItem('role');
    if(role === "OWNER") {
      return true;
    }
    return false;
  }

  private navProperty = new BehaviorSubject<boolean>(false);
  navProperty$ = this.navProperty.asObservable();

  userNav() {
    this.navProperty.next(true);
  }

  normalNav() {
    this.navProperty.next(false);
  }
  
}

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { User } from '../models/user.model';
// import { Login } from '../models/login.model';
// import { environment } from 'src/environments/environment';
 
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
 
//   public apiUrl = `${environment.apiUrl}/api`;
//   private currentUserRole = new BehaviorSubject<string>(null);
//   private currentUserId = new BehaviorSubject<number>(null);
 
//   constructor(private http: HttpClient) { }
 
//   private headers = new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('token')}`
//   })
//   username:string=localStorage.getItem('username');
//   userDetail:User;
 
 
 
//   // login(login: Login): Observable<any> {
//   //   console.log("before token");
//   //   return new Observable(observer => {
//   //     this.http.post(`${this.apiUrl}/login`, login, { responseType: 'text' }).subscribe(
//   //       (token) => {
//   //         console.log("token", token);
//   //         localStorage.setItem('token', token);
//   //         const username = this.decodeToken(token);
//   //         this.getUserByUsername(username).subscribe(
//   //           (data) => {
//   //             this.userDetail = data;
//   //             console.log("userDetail", this.userDetail);
//   //             if (this.userDetail && this.userDetail.userRole) {
//   //               this.currentUserRole.next(this.userDetail.userRole);
//   //               observer.next(this.userDetail); // Notify observers with user details
//   //               observer.complete();
//   //             } else {
//   //               observer.error(new Error("User details or userRole is undefined"));
//   //             }
//   //           },
//   //           error => {
//   //             console.error("Error fetching user details", error);
//   //             observer.error(error);
//   //           }
//   //           );
//   //         },
//   //         error => {
//   //           console.error("Login error", error); // Log the error for debugging
//   //           observer.error(error);
//   //         }
//   //         );
//   //       });
//   // }

//   public login(login):Observable<any> {
//     console.log(login);
//     return this.http.post(`${this.apiUrl}/api/login,`, login, {responseType: 'text'})
//   }
 
 
//   private decodeToken(token: string): any {
//     console.log(token, typeof token);
   
//     // Split the token to get the payload part
//     const payloadPart = token.split('.')[1];
   
//     // Decode the Base64 encoded payload
//     const payload = atob(payloadPart);
   
//     // Parse the JSON payload
//     const parsedPayload = JSON.parse(payload);
   
//     console.log(parsedPayload);
   
//     localStorage.setItem('username', parsedPayload.sub);
   
   
//     return parsedPayload;
//   }
 
 
 
//   public register(userRegister: User): Observable<User> {
//     return this.http.post<User>(this.apiUrl + "/register", userRegister);
//   }
 
//   getCurrentUserRole(): Observable<string> {
//     return this.currentUserRole.asObservable();
//   }
 
//   getCurrentUserId(): Observable<number> {
//     return this.currentUserId.asObservable();
//   }
 
//   // public getUserByUsername(username: string): Observable<User> {
//     //   return this.http.post<User>(`${this.apiUrl}/user`,username,{headers:this.headers});
//     // }
//     // public getUserByUsername(username:string):Observable<User>{
//     //   return this.http.get<User>(`${this.apiUrl}/user/${this.username}`);
//     // }
   
//   }
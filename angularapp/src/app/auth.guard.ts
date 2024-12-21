// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   // canActivate(
//   //   route: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   //   return true;
//   // }

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isLoggedIn()) {
//       return true;
//     } else {
//       this.router.navigate(['login']);
//       return false;
//     }
//   }
  
// }


// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './services/auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authservice:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      
      // return this._authservice.isLoggedIn();
      if(this._authservice.isLoggedIn()){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }

  }
  
}

@Injectable({
  providedIn: 'root'
})
export class LoggedIn implements CanActivate {
  constructor(private _authservice:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      
      // return this._authservice.isLoggedIn();
      if(this._authservice.isLoggedIn()){
        this.router.navigate(['/home']);
        return false;
      }
      else{
        // this.router.navigate(['/login']);
        return true;
      }

  }
  
}

@Injectable({
  providedIn: 'root'
})
export class SupplierGuard implements CanActivate {
  constructor(private _authservice:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      
      if( this._authservice.isSupplier()){
        return true;
      }
      else{
        this.router.navigate(['/']);
        return false;
      }

  }
  
}

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  constructor(private _authservice:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      
      if( this._authservice.isOwner()){
        return true;
      }
      else{
        this.router.navigate(['/']);
        return false;
      }

  }
  
}

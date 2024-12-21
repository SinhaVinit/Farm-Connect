// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   loginForm: FormGroup;


//   constructor(private authService: AuthService, private formBuilder: FormBuilder) {
//     this.loginForm = this.formBuilder.group({
//       username: ["", Validators.required],
//       password: ["", Validators.required]
//     })
//   }

//   ngOnInit(): void {
//     this.loginForm = this.formBuilder.group({
//       username: ["", Validators.required],
//       password: ["", Validators.required]
//     });
//   }

//   public login() {
//     // Log the current form values
//     console.log(this.loginForm.value);

//     // Call the login method from the authentication service
//     this.authService.login(this.loginForm.value).subscribe(
//       () => {
//         // On successful login, fetch the current user's role
//         this.authService.getCurrentUserRole().subscribe(
//           (data) => {
//             // Log the user's role data
//             console.log(data);
//             localStorage.setItem('userRole', data);
//           },
//           (error) => {
//             // Handle error in fetching user role
//             console.error("Error fetching user role", error);
//           }
//         );
//       },
//       (error) => {
//         // Handle login error
//         console.error("Login error", error);
//       }
//     );
//   }

//   get username() {
//     return this.loginForm.get("username");
//   }
//   get password() {
//     return this.loginForm.get("password");
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  formCheck = false;
  isOpen = false;


  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  public login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem("token", response);
          console.log('Logged in successfully', localStorage.getItem("token"));
          this.decodeToken(localStorage.getItem('token'));
          this.authService.userNav();
          this.router.navigate(['/home']);

          // setTimeout(()=>{
          //   location.reload();
          // },500);
          
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
          this.isOpen = true;
          console.error('Login error', error);
        }
      });
    }
    else {
      this.formCheck = true;
    }
  }

  private decodeToken(token: string): any {
    console.log(token, typeof token);

    // Split the token to get the payload part
    const payloadPart = token.split('.')[1];

    // Decode the Base64 encoded payload
    const payload = atob(payloadPart);

    // Parse the JSON payload
    const parsedPayload = JSON.parse(payload);

    console.log(parsedPayload);

    localStorage.setItem('username', parsedPayload.sub);
    localStorage.setItem('role', parsedPayload.role);
    localStorage.setItem('userId', parsedPayload.userId);

    return parsedPayload;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  closeModel() {
    this.isOpen = false;
  }

}
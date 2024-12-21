import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  passwordMismatch: boolean = false;
  errorMessage: string = "";
  formCheck:boolean = false;
  isOpen = false;
  isVisible = false;
 
 
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirmPassword: ["", Validators.required],
      username: ["", [Validators.required, Validators.minLength(5)]],
      mobileNumber: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      userRole: ["", Validators.required]
    })
  }
 
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirmPassword: ["", Validators.required],
      username: ["", [Validators.required, Validators.minLength(5)]],
      mobileNumber: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      userRole: ["", Validators.required]
    });
  }
 
  passwordEqualCheck() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.passwordMismatch = true;
    }
    else {
      this.passwordMismatch = false;
    }
  }
 
  public register() {
    if(this.registerForm.valid) {
      console.log("Saved");
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        console.log("Executed password equality check");
        return
      }
      else {
        console.log("Saved");
        this.authService.register(this.registerForm.value).subscribe(
          (data) => {
            console.log("Data", data);
            this.isVisible = true;
            setTimeout(()=>{
              this.isVisible = false;
            },2000);
            this.router.navigate(['/login']);
          },
          (error) => {
            this.errorMessage = error.error;
            this.isOpen = true;
          }
        )
      }
    }
    else {
      console.log("Form is not valid");
    }
  }
 
  checkForm() {
    if(this.registerForm.valid) {
      this.formCheck = false;
    }
    else {
      this.formCheck = true;
      this.isOpen = true;
    }
  }
 
  get username() {
    return this.registerForm.get("username");
  }
 
 
  get email() {
    return this.registerForm.get("email");
  }
 
  get password() {
    return this.registerForm.get("password");
  }
 
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
 
 
  get mobileNumber() {
    return this.registerForm.get("mobileNumber");
  }
 
  get userRole() {
    return this.registerForm.get("userRole");
  }
 
  get isMismatch() {
    return this.passwordMismatch;
  }
  
  closeModel() {
    this.isOpen = false;
  }

  closeNotification() {
    this.isVisible = false;
  }
}
 
 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AuthguardComponent } from './components/authguard/authguard.component';
import { CreatefeedComponent } from './components/createfeed/createfeed.component';
import { CreatelivestockComponent } from './components/createlivestock/createlivestock.component';
import { CreatemedicineComponent } from './components/createmedicine/createmedicine.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OwnereditlivestockComponent } from './components/ownereditlivestock/ownereditlivestock.component';
import { OwnerviewfeedComponent } from './components/ownerviewfeed/ownerviewfeed.component';
import { OwnerviewmedicineComponent } from './components/ownerviewmedicine/ownerviewmedicine.component';
import { OwnerviewrequestComponent } from './components/ownerviewrequest/ownerviewrequest.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RequestformComponent } from './components/requestform/requestform.component';
import { SuppliereditfeedComponent } from './components/suppliereditfeed/suppliereditfeed.component';
import { SuppliereditmedicineComponent } from './components/suppliereditmedicine/suppliereditmedicine.component';
import { SupplierrequestsComponent } from './components/supplierrequests/supplierrequests.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { ViewfeedComponent } from './components/viewfeed/viewfeed.component';
import { ViewlivestockComponent } from './components/viewlivestock/viewlivestock.component';
import { ViewmedicineComponent } from './components/viewmedicine/viewmedicine.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { AuthInterceptor } from './auth.interceptor';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { OpenforumComponent } from './components/openforum/openforum.component';
import { CardsComponent } from './components/cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminnavComponent,
    AdminviewfeedbackComponent,
    AuthguardComponent,
    CreatefeedComponent,
    CreatelivestockComponent,
    CreatemedicineComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    OwnereditlivestockComponent,
    OwnerviewfeedComponent,
    OwnerviewmedicineComponent,
    OwnerviewrequestComponent,
    RegistrationComponent,
    RequestformComponent,
    SuppliereditfeedComponent,
    SuppliereditmedicineComponent,
    SupplierrequestsComponent,
    UseraddfeedbackComponent,
    UsernavComponent,
    UserviewfeedbackComponent,
    ViewfeedComponent,
    ViewlivestockComponent,
    ViewmedicineComponent,
    FooterComponent,
    AboutusComponent,
    ContactusComponent,
    OpenforumComponent,
    CardsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

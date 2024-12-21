import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewmedicineComponent } from './components/viewmedicine/viewmedicine.component';
import { CreatefeedComponent } from './components/createfeed/createfeed.component';
import { ViewfeedComponent } from './components/viewfeed/viewfeed.component';
import { OwnerviewfeedComponent } from './components/ownerviewfeed/ownerviewfeed.component';
import { SuppliereditfeedComponent } from './components/suppliereditfeed/suppliereditfeed.component';
import { CreatemedicineComponent } from './components/createmedicine/createmedicine.component';
import { SuppliereditmedicineComponent } from './components/suppliereditmedicine/suppliereditmedicine.component';
import { OwnerviewmedicineComponent } from './components/ownerviewmedicine/ownerviewmedicine.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { LoginComponent } from './components/login/login.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { CreatelivestockComponent } from './components/createlivestock/createlivestock.component';
import { ViewlivestockComponent } from './components/viewlivestock/viewlivestock.component';
import { OwnereditlivestockComponent } from './components/ownereditlivestock/ownereditlivestock.component';
import { AuthGuard, LoggedIn, OwnerGuard, SupplierGuard } from './auth.guard';
import { RequestformComponent } from './components/requestform/requestform.component';
import { OwnerviewrequestComponent } from './components/ownerviewrequest/ownerviewrequest.component';
import { SupplierrequestsComponent } from './components/supplierrequests/supplierrequests.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { OpenforumComponent } from './components/openforum/openforum.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  // { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent },

  { path: 'feed/supplier/create', component: CreatefeedComponent, canActivate:[SupplierGuard] },
  { path: 'feed/supplier/view', component: ViewfeedComponent, canActivate:[SupplierGuard] },
  { path: 'feed/owner/view', component: OwnerviewfeedComponent, canActivate:[OwnerGuard] },
  { path: 'feed/supplier/edit/:id', component: SuppliereditfeedComponent, canActivate:[SupplierGuard] },

  { path: "medicine/supplier/create", component: CreatemedicineComponent, canActivate:[SupplierGuard] },
  { path: "medicine/supplier/edit/:id", component: SuppliereditmedicineComponent, canActivate:[SupplierGuard] },
  { path: "medicine/owner/view", component: OwnerviewmedicineComponent, canActivate:[OwnerGuard] },
  { path: "medicine/supplier/view", component: ViewmedicineComponent, canActivate:[SupplierGuard] },

  { path: "feedbacks/supplier/view", component: AdminviewfeedbackComponent, canActivate:[SupplierGuard] },
  { path: "feedbacks/owner/add", component: UseraddfeedbackComponent, canActivate:[OwnerGuard] },
  { path: "feedbacks/owner/view", component: UserviewfeedbackComponent, canActivate:[OwnerGuard] },

  { path: "livestock/owner/add", component: CreatelivestockComponent,canActivate:[OwnerGuard] },
  { path: "livestock/owner/view", component: ViewlivestockComponent, canActivate:[OwnerGuard] },
  { path: "livestock/owner/edit/:id", component: OwnereditlivestockComponent, canActivate:[OwnerGuard] },

  { path: "request/owner/:id/:name/:type", component: RequestformComponent,canActivate:[OwnerGuard] },
  { path: "request/owner/view", component: OwnerviewrequestComponent, canActivate:[OwnerGuard] },
  { path: "request/supplier/view", component: SupplierrequestsComponent, canActivate:[SupplierGuard] },

  { path: "registration", component: RegistrationComponent, canActivate:[LoggedIn] },
  { path: "login", component: LoginComponent, canActivate:[LoggedIn] },
  
  { path: "aboutus", component: AboutusComponent },
  { path: "contactus", component: ContactusComponent },
  
  { path: "openforum", component: OpenforumComponent },

  {path:"**", component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

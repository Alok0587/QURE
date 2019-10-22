import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientRegisterComponent } from './patients/patient-register/patient-register.component';
import { PatientLoginComponent } from './patients/patient-login/patient-login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DoctorLoginComponent } from './doctors/doctor-login/doctor-login.component';
import { DoctorRegisterComponent } from './doctors/doctor-register/doctor-register.component';
import { Blog1Component } from './blogs/blog1/blog1.component';
import { Blog2Component } from './blogs/blog2/blog2.component';
import { Blog3Component } from './blogs/blog3/blog3.component';
import { Blog4Component } from './blogs/blog4/blog4.component';
import { Blog5Component } from './blogs/blog5/blog5.component';
import { Blog6Component } from './blogs/blog6/blog6.component';
import { AddAppointmentComponent } from './appointments/add-appointment/add-appointment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'patients/register', component: PatientRegisterComponent },
  { path: 'patients/login', component: PatientLoginComponent },
  { path: 'doctors', component: PatientsComponent },
  { path: 'doctors/register', component: DoctorRegisterComponent },
  { path: 'doctors/login', component: DoctorLoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'blogs/blog1', component: Blog1Component },
  { path: 'blogs/blog2', component: Blog2Component },
  { path: 'blogs/blog3', component: Blog3Component },
  { path: 'blogs/blog4', component: Blog4Component },
  { path: 'blogs/blog5', component: Blog5Component },
  { path: 'blogs/blog6', component: Blog6Component },
  { path: 'patients/:id', component: PatientsComponent },
  { path: 'appointments/:id', component: AddAppointmentComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { patLoginComponent } from './patient/pat-login/pat-login.component';
import { docLoginComponent } from './doctor/doct-login/doct-login.component';
import { DoctRegComponent } from './doctor/doct-reg/doct-reg.component';
import { PatRegComponent } from './patient/pat-reg/pat-reg.component';
// import { BookComponent } from './patient/book-appointment/book/book.component';
// import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { BlogsComponent } from './blogs/blogs.component';
import { Blog1Component } from './blogs/blog1/blog1.component';
import { Blog2Component } from './blogs/blog2/blog2.component';
import { Blog3Component } from './blogs/blog3/blog3.component';
import { ContactComponent } from './contact/contact.component';
import { DoctAppointmentComponent } from './appointment/doct-appointment/doct-appointment.component';
import { PatAppointmentComponent } from './appointment/pat-appointment/pat-appointment.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { OrdermedicinesComponent } from './patient/ordermedicines/ordermedicines.component';
import { BookappointmentComponent } from './appointment/bookappointment/bookappointment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'loginPatient', component: patLoginComponent },
  { path: 'loginDoctor', component: docLoginComponent },
  { path: 'patientLanding', component: PatientComponent },
  { path: 'doctorLanding', component: DoctorComponent },
  { path: 'loginDoctor/registerDoctor', component: DoctRegComponent },
  { path: 'loginPatient/registerPatient', component: PatRegComponent },
  // {path:'patientLanding/bookings/bookAppointment',component:PatAppointmentComponent},
  // {path:'patientLanding/bookings',component:PatAppointmentComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blogs/blog1', component: Blog1Component },
  { path: 'blogs/blog2', component: Blog2Component },
  { path: 'blogs/blog3', component: Blog3Component },
  { path: 'patientLanding/:id', component: PatientComponent },
  { path: 'doctorLanding/:id', component: DoctorComponent },
  { path: 'doctorLanding/:dId/appointments', component: DoctAppointmentComponent },
  { path: 'doctorLanding/:dId/appointments/:aId', component: DoctAppointmentComponent },
  { path: 'patientLanding/:pId/appointments', component: PatAppointmentComponent },
  { path: 'patientLanding/:pId/appointments/new', component: PatAppointmentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'patient/ordermedicines', component: OrdermedicinesComponent },
  { path: 'appointment/bookappointment', component: BookappointmentComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

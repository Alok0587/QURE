
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { patLoginComponent } from './patient/pat-login/pat-login.component';
import { docLoginComponent } from './doctor/doct-login/doct-login.component';
import { DoctRegComponent } from './doctor/doct-reg/doct-reg.component';
import { PatRegComponent } from './patient/pat-reg/pat-reg.component';
import { BookComponent } from './patient/book-appointment/book/book.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { BlogsComponent } from './blogs/blogs.component';
import { Blog1Component } from './blogs/blog1/blog1.component';
import { Blog2Component } from './blogs/blog2/blog2.component';
import { Blog3Component } from './blogs/blog3/blog3.component';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'loginPatient',component:patLoginComponent},
  {path:'loginDoctor',component:docLoginComponent},
  {path:'patientLanding',component:PatientComponent},
  {path:'doctorLanding',component:DoctorComponent},
  {path:'loginDoctor/registerDoctor',component:DoctRegComponent},
  {path:'loginPatient/registerPatient',component:PatRegComponent},
  {path:'patientLanding/bookings/bookAppointment',component:BookComponent},
  {path:'patientLanding/bookings',component:BookAppointmentComponent},
  {path:'contact',component:ContactComponent},
  {path:'blogs',component:BlogsComponent},
  {path:'blogs/blog1',component:Blog1Component},
  {path:'blogs/blog2',component:Blog2Component},
  {path:'blogs/blog3',component:Blog3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

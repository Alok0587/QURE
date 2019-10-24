import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PatientsComponent } from './patients/patients.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { AdminComponent } from './admin/admin.component';
import { PatientLoginComponent } from './patients/patient-login/patient-login.component';
import { PatientRegisterComponent } from './patients/patient-register/patient-register.component';

import { DoctorLoginComponent } from './doctors/doctor-login/doctor-login.component';
import { Blog1Component } from './blogs/blog1/blog1.component';
import { Blog2Component } from './blogs/blog2/blog2.component';
import { Blog3Component } from './blogs/blog3/blog3.component';
import { Blog4Component } from './blogs/blog4/blog4.component';
import { Blog5Component } from './blogs/blog5/blog5.component';
import { Blog6Component } from './blogs/blog6/blog6.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AddAppointmentComponent } from './appointments/add-appointment/add-appointment.component';
import { BookMedicineComponent } from './patients/ordermedicines/book-medicine/book-medicine.component';
import { FaqComponent } from './faq/faq.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { SpecializationComponent } from './specialization/specialization.component';
import { DoctorRegisterComponent } from './doctors/doctor-register/doctor-register.component';
import { ChatComponent } from './chat/chat.component';
import { AdminDoctorComponent } from './admin/admin-doctor/admin-doctor.component';
import { AdminPharmacyComponent } from './admin/admin-pharmacy/admin-pharmacy.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    PatientsComponent,
    DoctorsComponent,
    AdminComponent,
    PatientLoginComponent,
    PatientRegisterComponent,
    DoctorRegisterComponent,
    DoctorLoginComponent,
    Blog1Component,
    Blog2Component,
    Blog3Component,
    Blog4Component,
    Blog5Component,
    Blog6Component,
    AppointmentsComponent,
    AddAppointmentComponent,
    BookMedicineComponent,
    FaqComponent,
    AdminComponent,
    AdminloginComponent,
    SpecializationComponent,
    ChatComponent,
    AdminDoctorComponent,
    AdminPharmacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
  // schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavComponent } from './shared/header/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorComponent } from './doctor/doctor.component';
import { patLoginComponent } from './patient/pat-login/pat-login.component';
import { docLoginComponent } from './doctor/doct-login/doct-login.component';
import { DoctRegComponent } from './doctor/doct-reg/doct-reg.component';
import { PatRegComponent } from './patient/pat-reg/pat-reg.component';
// import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
// import { BookComponent } from './patient/book-appointment/book/book.component';
import { HttpClientModule} from '@angular/common/http';
import { BlogsComponent } from './blogs/blogs.component';
import { Blog1Component } from './blogs/blog1/blog1.component';
import { Blog2Component } from './blogs/blog2/blog2.component';
import { Blog3Component } from './blogs/blog3/blog3.component';
import { ContactComponent } from './contact/contact.component';
import { DoctAppointmentComponent } from './appointment/doct-appointment/doct-appointment.component';
import { PatAppointmentComponent } from './appointment/pat-appointment/pat-appointment.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    PatientComponent,
    DoctorComponent,
    patLoginComponent,
    docLoginComponent,
    DoctRegComponent,
    PatRegComponent,
    // BookAppointmentComponent,
    // BookComponent,
    BlogsComponent,
    Blog1Component,
    Blog2Component,
    Blog3Component,
    ContactComponent,
    DoctAppointmentComponent,
    PatAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
})
export class AppModule { }

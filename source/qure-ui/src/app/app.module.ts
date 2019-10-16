import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './header/nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorComponent } from './doctor/doctor.component';
import { patLoginComponent } from './patient/pat-login/pat-login.component';
import { docLoginComponent } from './doctor/doct-login/doct-login.component';
import { DoctRegComponent } from './doctor/doct-reg/doct-reg.component';
import { PatRegComponent } from './patient/pat-reg/pat-reg.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { BookComponent } from './patient/book-appointment/book/book.component';
import { HttpClientModule} from '@angular/common/http';


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
    BookAppointmentComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

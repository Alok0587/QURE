import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.scss']
})
export class DoctorLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private doctorService: DoctorService, public router: Router) {

    this.loginForm = new FormGroup({
      doctorId: new FormControl(),
      email: new FormControl(),
      password:new FormControl()
   });
   }

   async onSubmitButton(){
    console.log(this.loginForm.value.doctorId);
  
    
   let id = this.loginForm.value.doctorId;
    this.router.navigate(['/doctors', id]);
  }
  ngOnInit() {
  }

}

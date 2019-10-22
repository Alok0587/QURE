import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { PatientService } from '../patient.service';
@Component({
  selector: 'app-pat-login',
  templateUrl: './pat-login.component.html',
  styleUrls: ['./pat-login.component.css']
})
export class patLoginComponent implements OnInit {

loginForm: FormGroup;

  constructor(private patientService: PatientService, public router: Router) { 
    this.loginForm = new FormGroup({
      patientId: new FormControl(),
      email: new FormControl(),
      password:new FormControl()
   });
  }
  async onSubmitButton(){
    console.log(this.loginForm.value.patientId);
    

    let id = this.loginForm.value.patientId;
    this.router.navigate(['/patientLanding', id]);
  }
  ngOnInit() {
  }

}

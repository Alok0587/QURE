import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.scss']
})
export class PatientLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private patientService: PatientService, public router: Router) {
    this.loginForm = new FormGroup({
      patientId: new FormControl('',Validators.required),
      email: new FormControl('', [ 
        Validators.required,
        Validators.email                                
      ]),
      password: new FormControl('',[Validators.required,
      Validators.min(4)])
    });
  }

  async onSubmitButton() {
    console.log(this.loginForm.value.patientId);


    let id = this.loginForm.value.patientId;
    this.router.navigate(['/patients', id]);
  }

  ngOnInit() {
  }

}

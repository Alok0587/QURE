import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss']
})
export class PatientRegisterComponent implements OnInit {

  patientForm: FormGroup;
  isSaved: boolean;
  gender='male';
   loading:boolean=false;
  constructor(private patientService: PatientService, private router: Router) {
    window.scrollTo(0,0);
    this.patientForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(4)
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(125)
      ]),
      gender: new FormControl('male', Validators.required),
      phone: new FormControl('', [Validators.required,
        Validators.pattern("[0-9]{10}"),]),
        
      address: new FormGroup({
        buildingName: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        pincode: new FormControl('', [Validators.required,
          Validators.pattern('^[0-9]{6}')
        ]),
        state: new FormControl('', [Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
        ])
      })

    });
  }

  async onAddPatientHandler() {
    this.loading=true;
    console.log(this.patientForm);
    console.log(this.patientForm.value);
    let res: any = await this.patientService.registerPatient(this.patientForm.value);
    console.log(res);

    if (res && res.message) {
      this.isSaved = true;
    }
    

    this.router.navigate(['patients/login', { regStatus: this.isSaved }] );
    // this.router.navigate(['patients/login']);
  }

  ngOnInit() {
  }

  

}

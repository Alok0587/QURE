import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-pat-reg',
  templateUrl: './pat-reg.component.html',
  styleUrls: ['./pat-reg.component.css']
})
export class PatRegComponent implements OnInit {

  //step1: create Form Group
  patientForm: FormGroup;
  isSaved: boolean = false;


  constructor(private patientService: PatientService) {
    this.patientForm = new FormGroup({

      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),


      patientId: new FormControl('', Validators.required)
    });
  }

  async onAddPatientHandler() {
    console.log(this.patientForm);
    console.log(this.patientForm.value);
    1//send data to service
    let res: any = await this.patientService.createPatient(this.patientForm.value);
    2//get the response from service

    console.log(res);

    if (res && res.message) {
      this.isSaved = true;
    }
  }


  ngOnInit() {
  }

}

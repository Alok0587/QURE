import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.scss']
})
export class DoctorRegisterComponent implements OnInit {

  doctorForm: FormGroup;
  isSaved: boolean;
  constructor(private doctorService: DoctorService) { 

    this.doctorForm = new FormGroup({
      // Step2: Create Form Control
      name: new FormControl('', [ 
                                Validators.required,
                                Validators.minLength(2)                                
                              ] ),
      email: new FormControl('', [ 
                                Validators.required,
                                Validators.email                                
                              ] ),  
      age: new FormControl('', [ 
                                Validators.required,
                                Validators.min(1),
                                Validators.max(125)
                              ] ),
      gender: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      specialization:new FormControl('',Validators.required),
       address: new FormGroup({
        buildingName: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required)
      })
    });
  }
  
  async onAddDoctorHandler() {
    console.log(this.doctorForm);
    console.log(this.doctorForm.value);
    let res: any = await this.doctorService.registerDoctor(this.doctorForm.value);
    console.log(res);

    if (res && res.message) {
      this.isSaved = true;
    }
  }
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-doct-reg',
  templateUrl: './doct-reg.component.html',
  styles: []
})
export class DoctRegComponent implements OnInit {


  doctorForm: FormGroup;
  isSaved: boolean;


  constructor(private doctorService: DoctorService) {
    this.doctorForm = new FormGroup({

      name: new FormControl('', Validators.required),  
      email: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      licenseNumber: new FormControl('', Validators.required),
      // specialization: new FormControl('', Validators.required),
      doctorId: new FormControl('', Validators.required)


    });
  }

  ngOnInit() {
  }
  async onDoctorHandler() {
    console.log(this.doctorForm);
    console.log(this.doctorForm.value);
    let res: any = await this.doctorService.createDoctor(this.doctorForm.value);

    console.log(res);

    if (res && res.message) {
      this.isSaved = true;
    }

  }
}

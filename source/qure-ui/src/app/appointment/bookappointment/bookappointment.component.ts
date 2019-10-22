import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styles: []
})
// export class BookappointmentComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

export class BookappointmentComponent implements OnInit {

  appointmentList: any[];
  appointmentSubscription: Subscription;

  appointmentSubscription2: Subscription;

  duplicateAppointmentData: any;
  appointmentData: any;
  appId: string;
  bookForm: FormGroup;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) {
    this.bookForm = new FormGroup({
      //step2; create Form Control
      id: new FormControl('', Validators.required), //step5: add validators
      date: new FormControl('', [
        Validators.required,
        Validators.max(24)
      ]),
      price: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.appointmentSubscription = this.appointmentService.getAppointments()
      .subscribe((res: any[]) => {
        console.log(res);
        this.appointmentList = res;
      });

  }
  async onBookHandler(bookForm) {
    console.log(this.bookForm);
    console.log(this.bookForm.value);
    1//send data to service
    let res: any = await this.appointmentService.createAppointment(this.bookForm.value);
    2//get the response from service

    console.log(res);

  }

  async onUpdateHandler(formData) {

    console.log(formData); // you can validate using this

    // use promise based submission
    // 1. send it service
    let res = await this.appointmentService.updateAppointment(this.duplicateAppointmentData);
    console.log(res); // 2. get the resp from service

    // if(res){
    //   this.isSaved = true;
    // }
  }

}
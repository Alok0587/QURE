import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  
  appointmentList: any[];
  appointmentSubscription: Subscription;

  appointmentSubscription2: Subscription;

  duplicateAppointmentData: any;
  appointmentData: any;
  appId: string;
  bookForm: FormGroup;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, public router: Router) {
    
   }

  ngOnInit() {
    // const patientId: string = this.route.snapshot.paramMap.get('id');
    const _patientId: string = this.route.snapshot.paramMap.get('id');
    console.log(_patientId)
    this.bookForm= new FormGroup({
      //step2; create Form Control
      patientId: new FormControl(_patientId, Validators.required),
      doctorId: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required), //step5: add validators
      appointmentDate: new FormControl('', [
                                Validators.required
                                
                              ]),
      price: new FormControl('500', Validators.required)
    });
  }

  async onBookHandler(bookForm){
    console.log(this.bookForm);
    console.log(this.bookForm.value);
    
    let res: any = await this.appointmentService.createAppointment(this.bookForm.value);


    console.log(res);

 
  }

}

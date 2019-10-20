import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doct-appointment',
  templateUrl: './doct-appointment.component.html',
  styleUrls: ['./doct-appointment.component.css']
})
export class DoctAppointmentComponent implements OnInit {

  appointmentList: any[];
  appointmentSubscription: Subscription;

  appointmentSubscription2: Subscription;

  duplicateAppointmentData: any;
  appointmentData: any;
  appId: string;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) {
    console.log("inside Constructor");
  }

  ngOnInit() { // lifecycle hook
    console.log("inside ngOnInit");

    this.appointmentSubscription = this.appointmentService.getAppointments()
      .subscribe((res: any[]) => {
        console.log(res);
        this.appointmentList = res;
      });


  }
  async onViewHandler(id) {
    const appId = id;

    // 2. call the service method
    this.appointmentSubscription2 = await this.appointmentService.getAppointmentById(appId)
      .subscribe((res: any) => { // 3. get the resp from service
        console.log(res);
        this.appointmentData = res;
      });

    // this.duplicateAppointmentData = JSON.parse(JSON.stringify(this.appointmentData));

  }

  async onDeleteHandler(id) {
    const appId = id;

    // 2. call the service method
    this.appointmentSubscription2 = await this.appointmentService.deleteAppointment(appId)
      .subscribe((res: any) => { // 3. get the resp from service
        console.log(res);

      });

    // this.duplicateAppointmentData = JSON.parse(JSON.stringify(this.appointmentData));

  }

  // async onUpdateHandler( formData ) {
  //   console.log(formData); // you can validate using this

  //   // use promise based submission
  //   // 1. send it service
  //   let res = await this.employeeService.updateEmployee(this.duplicateEmployeeData)
  //   console.log(res); // 2. get the resp from service

  //   if(res){
  //     this.isSaved = true;
  //   }
  // }

  ngOnDestroy() {
    console.log("Inside destroy");
    this.appointmentSubscription.unsubscribe();
  }

}

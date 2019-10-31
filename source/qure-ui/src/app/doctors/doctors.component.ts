import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from './doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointments/appointment.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  doctorData: any;
  duplicateDoctorData: any;

  doctorSubscription: Subscription;
  doctorId: string;
  isSaved2: boolean = false;


  appointmentList: any[];
  appointmentSubscription: Subscription;

  appointmentSubscription2: Subscription;

  duplicateAppointmentData: any;
  appointmentData: any;
  appId: string;

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService, private route: ActivatedRoute, public router: Router) { }

  async ngOnInit() {
    // const _doctorId: string = this.route.snapshot.paramMap.get('id');
    let dEmail = sessionStorage.getItem('username');


    this.doctorSubscription = this.doctorService.getDoctorByEmail(dEmail)
      .subscribe(async (res: any) => {
        console.log(res);
        this.doctorData = await res;
        console.log(this.doctorData.doctorId);
        this.onViewAppointmentList();
      });
    console.log("checking whether doctor data is there or not");

  }
  onViewAppointmentList() {
    this.appointmentSubscription = this.appointmentService.getAppointmentsByDoctorId(this.doctorData.doctorId)
      .subscribe(async (res: any[]) => {
        console.log(res);
        this.appointmentList = await res;
      });
  }


  async onViewHandler(appointmentData) {
    console.log(appointmentData);
    this.duplicateAppointmentData = await JSON.parse(JSON.stringify(appointmentData));
    console.log("duplicate is " + this.duplicateAppointmentData);
    //this.duplicateAppointmentData = this.appointmentData;
    //JSON.parse(JSON.stringify(this.appointmentData));
  }
  async onDeleteHandler(aId: any) {
    let res = await this.appointmentService.deleteAppointment(aId);
    this.onViewAppointmentList();
  }

  onEditHandler() {
    this.duplicateDoctorData = JSON.parse(JSON.stringify(this.doctorData));
    this.onViewAppointmentList();
  }

  async onUpdateHandler(formData) {
    console.log(formData);
    console.log(formData.value);


    var obj = formData.value;
    obj.id = this.doctorId;


    let res = await this.doctorService.updateDoctor(this.duplicateDoctorData);
    console.log(res);
    if (res) {
      this.isSaved2 = true;
      this.ngOnInit();
    }
    //this.router.navigate(['/doctorLanding', this.doctorId]);
  }
  ngOnDestroy() {
    this.doctorSubscription.unsubscribe();
    // this.appointmentSubscription.unsubscribe();
    // this.appointmentSubscription.unsubscribe();

  }

}

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
  
  doctorSubscription: Subscription;
  doctorId: string;
  isSaved2: boolean = false;


  appointmentList: any[];
  appointmentSubscription: Subscription;

  appointmentSubscription2: Subscription;
   
  duplicateAppointmentData: any;
  appointmentData: any;
  appId: string;
  duplicateDoctorData: any;

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    const _doctorId: string = this.route.snapshot.paramMap.get('id');

    

    this.doctorSubscription = this.doctorService.getDoctorById(_doctorId)
      .subscribe((res: any) => {
        console.log(res);
        this.doctorData = res;
      });

      this.appointmentSubscription = this.appointmentService.getAppointmentsByDoctorId(_doctorId)
      .subscribe((res: any[]) => {
        console.log(res);
        this.appointmentList = res;
      });
  }

  
  async onViewHandler(appId){
    this.appointmentSubscription2 = await this.appointmentService.getAppointmentById(appId)
      .subscribe( (res: any) => { 
        console.log( res );
        this.appointmentData = res;
      });
    //this.duplicateAppointmentData = this.appointmentData;
    //JSON.parse(JSON.stringify(this.appointmentData));
  }
  async onDeleteHandler(aId: any){
    let res = await this.appointmentService.deleteAppointment(aId)
    .subscribe((res: any[]) => {
      console.log(res);
      this.appointmentList = res;
    });
    console.log(res);
  }

  onEditHandler() {

    this.duplicateDoctorData = JSON.parse(JSON.stringify(this.doctorData));
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
    }
    //this.router.navigate(['/doctorLanding', this.doctorId]);
  }

}

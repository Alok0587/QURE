import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from './patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../appointments/appointment.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patientData: any;
  duplicatePatientData: any;
  patientSubscription: Subscription;
  patientId: string;
  isSaved2: boolean = false;


  appointmentList: any[];
  appointmentSubscription: Subscription;

  appointmentSubscription2: Subscription;

  duplicateAppointmentData: any;
  appointmentData: any;
  appId: string;

  constructor(private appointmentService: AppointmentService, private patientService: PatientService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    const _patientId: string = this.route.snapshot.paramMap.get('id');

    

    this.patientSubscription = this.patientService.getPatientById(_patientId)
      .subscribe((res: any) => {
        console.log(res);
        this.patientData = res;
      });

      this.appointmentSubscription = this.appointmentService.getAppointmentsByPatientId(_patientId)
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
    this.duplicateAppointmentData = JSON.parse(JSON.stringify(this.appointmentData));
  }

  onBookAppointmentHandler(pId: any){
    this.router.navigate(['appointments/' + pId])
  }
  async onDeleteHandler(aId: any){
    let res = await this.appointmentService.deleteAppointment(aId)
    .subscribe((res: any[]) => {
      console.log(res);
      this.appointmentList = res;
    });
    console.log(res);
  }
  async onUpdateHandler( formData ) {
  
    let res = await this.appointmentService.updateAppointment(this.duplicateAppointmentData)
    console.log(res); // 2. get the resp from service
  }

  onBookHandler(id)
  {
    console.log("Id: "+id);

    this.router.navigate(['patients/bookmedicine/',id]);
  }

}

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

  onBookAppointmentClick(pId: any){
    
  }

}

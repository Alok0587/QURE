import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctors/doctor.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../appointments/appointment.service';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {

  doctorList :any[];
  doctorData :any;
  doctorSubscription: Subscription;
  approval :number =0;
  isSaved2: boolean;
  constructor(private doctorService: DoctorService, private route: ActivatedRoute,private appointmentService: AppointmentService) { }

  ngOnInit() {
    
    const specialization: string = this.route.snapshot.paramMap.get('spec');
    console.log(specialization);

    this.doctorSubscription = this.doctorService.getDoctorBySpecialization2(specialization)
      .subscribe((res: any) => {
        console.log(res);
        this.doctorList = res;

       // this.doctorSubscription = this.doctorService.getDoctorById()
      });
  }

  async onViewHandler(email){

    console.log(email);
    this.doctorSubscription = await this.doctorService.getDoctorById(email)
    .subscribe( (res: any) => { 
        console.log("xyzzzis"+ res );
        this.doctorData = res;
      });
    //this.duplicateAppointmentData = JSON.parse(JSON.stringify(this.appointmentData));
  }
  async onDeleteHandler(dId: any){
    let res = await this.doctorService.deleteDoctor(dId)
    .subscribe((res: any[]) => {
      console.log(res);
     
    });
   
  }
  async onUpdateHandler(doctorinfo){
    
    this.approval=1;
    
    doctorinfo.approvalStatus=1;
   let res=await this.doctorService.updateDoctor(doctorinfo);
   console.log(res);
   if(res)
   {
     this.isSaved2=true;
   }
}
}

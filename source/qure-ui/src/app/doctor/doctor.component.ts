import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from './doctor.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctorData: any;
  duplicateDoctorData: any;
  doctorSubscription: Subscription;
  doctorId: string;
  isSaved2: boolean = false;

  constructor(private doctorService: DoctorService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    const _doctorId: string = this.route.snapshot.paramMap.get('id');



    this.doctorSubscription = this.doctorService.getDoctorById(_doctorId)
      .subscribe((res: any) => {
        console.log(res);
        this.doctorData = res;
      });
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

  ngOnDestroy() {
    console.log("inside destroy of doctor");
    this.doctorSubscription.unsubscribe();
  }

  onAppointmentClick(dId: string) {
    // let id = this.doctorId;
    this.router.navigate(['doctorLanding/' + dId + '/appointments'])
  }



}

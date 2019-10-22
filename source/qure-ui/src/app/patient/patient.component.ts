import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PatientService } from './patient.service';
import { Subscription } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patientData: any;
  duplicatePatientData: any;
  patientSubscription: Subscription;
  patientId: string;
  isSaved2: boolean = false;

  constructor(private patientService: PatientService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    const _patientId: string = this.route.snapshot.paramMap.get('id');

    

    this.patientSubscription = this.patientService.getPatientById(_patientId)
      .subscribe((res: any) => {
        console.log(res);
        this.patientData = res;
      });
  }

  onEditHandler() {

    this.duplicatePatientData = JSON.parse(JSON.stringify(this.patientData));
    console.log(this.duplicatePatientData);
  }

  async onUpdateHandler(formData) {
    console.log(formData);
    console.log(formData.value);

    var obj = formData.value;
    obj.id = this.patientId;

    let res = await this.patientService.updatePatient(this.duplicatePatientData);
    console.log(res);
    if (res) {
      this.isSaved2 = true;
    }
  }

  onAppointmentClick(pId: string){
    // let id = this.doctorId;
    this.router.navigate(['patientLanding/' + pId + '/appointments'])
  }



  ngOnDestroy() {
    console.log("inside destroy of patient details");
    this.patientSubscription.unsubscribe();
  }
  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/loginPatient']);
  }

}

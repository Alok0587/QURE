import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctors/doctor.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {

  doctorList :any[];
  doctorData :any;
  doctorSubscription: Subscription;

  constructor(private doctorService: DoctorService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    const specialization: string = this.route.snapshot.paramMap.get('spec');
    console.log(specialization);

    this.doctorSubscription = this.doctorService.getDoctorBySpecialization(specialization)
      .subscribe((res: any) => {
        console.log(res);
        this.doctorList = res;
      });
  }

}

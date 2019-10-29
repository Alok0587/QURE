import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-doctor',
  templateUrl: './admin-doctor.component.html',
  styleUrls: ['./admin-doctor.component.scss']
})
export class AdminDoctorComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSubmitDoctor(spec)
  {
    console.log(spec);
    this.router.navigate(['specialization/',spec]);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {
  name:String="Ragini Garg";

  constructor() { }

  ngOnInit() {
  }

}

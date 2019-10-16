import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit {
  name:String="Alok Kumar";
  constructor() { }

  ngOnInit() {
  }

}

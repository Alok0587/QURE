import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []

})

export class AdminComponent implements OnInit {

  
  constructor(public router: Router) {

  }

  ngOnInit() {
   
  }

  onSubmitDoctor(spec)
  {
    console.log(spec);
    this.router.navigate(['specialization/',spec]);
  }

  

}

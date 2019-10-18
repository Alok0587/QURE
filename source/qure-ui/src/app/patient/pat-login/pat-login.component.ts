import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-pat-login',
  templateUrl: './pat-login.component.html',
  styleUrls: ['./pat-login.component.css']
})
export class patLoginComponent implements OnInit {

loginForm: FormGroup;
  constructor(public router: Router) { 
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password:new FormControl()
   });
  }
  onSubmitButton(){
    console.log(this.loginForm.value);
    //here validation required
    this.router.navigate(['patientLanding']);
  }
  ngOnInit() {
  }

}

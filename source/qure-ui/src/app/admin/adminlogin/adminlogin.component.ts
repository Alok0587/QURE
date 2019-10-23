import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})

export class AdminloginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public router: Router) {
    this.loginForm = new FormGroup({

      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmitButton() {
    this.router.navigate(['/adminlogin/admin']);
  }

  ngOnInit() {
  }

}

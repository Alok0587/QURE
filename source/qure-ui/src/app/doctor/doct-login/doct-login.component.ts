import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-doct-login',
  templateUrl: './doct-login.component.html',
  styleUrls: ['./doct-login.component.css']
})
export class docLoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(public router: Router) {
    this.loginForm = new FormGroup({
      doctorId: new FormControl('', Validators.required),
      email: new FormControl(),
      password: new FormControl()
    });
  }
  onSubmitButton() {
    console.log(this.loginForm.value);
    //here validation required
    let id: string = this.loginForm.value.doctorId;

    this.router.navigate(['/doctorLanding', id]);
  }
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog6',
  templateUrl: './blog6.component.html',
  styleUrls: ['./blog6.component.scss']
})
export class Blog6Component implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}

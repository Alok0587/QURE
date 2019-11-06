import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog5',
  templateUrl: './blog5.component.html',
  styleUrls: ['./blog5.component.scss']
})
export class Blog5Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    window.scrollTo(0, 0);
    }
}

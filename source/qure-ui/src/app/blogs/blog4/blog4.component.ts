import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog4',
  templateUrl: './blog4.component.html',
  styleUrls: ['./blog4.component.scss']
})
export class Blog4Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    window.scrollTo(0, 0);
    }
}

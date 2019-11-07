import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'qure-ui';
  progress = 0;
  constructor() { }
  progressBar = document.querySelector('.progress-bar');
  intervalId;

  ngOnInit() {
    const getDownloadProgress = () => {
      console.log('getDownload', this);
      if (this.progress <= 99) {
        console.log('inside if', this.progress);
        this.progress = this.progress + 1;
      }
      else {
        clearInterval(this.intervalId);
      }
    }
    this.intervalId = setInterval(getDownloadProgress, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}

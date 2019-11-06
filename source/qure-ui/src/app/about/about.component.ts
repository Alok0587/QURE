import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en','fr']);
    translate.setDefaultLang('en');
    const browserLang= translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang:'en');

   }


  ngOnInit() {
  }
  
  ngAfterViewChecked() {
    window.scrollTo(0, 0);
    }
}

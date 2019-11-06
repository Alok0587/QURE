import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

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

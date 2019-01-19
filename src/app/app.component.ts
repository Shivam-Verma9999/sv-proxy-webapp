import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebService } from './web.service';

import { translate } from '../assets/url.translator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sv-proxy';
  interval: any;
  response = 'Enter url to search';
  form = new FormGroup({
    url: new FormControl('')
  });

  constructor(private service: WebService ) {}

  onSubmit(url: HTMLInputElement): void {
    let loading = 'Loading.';
    const element = document.querySelector('#response_content');
    element.innerHTML = '';
    this.interval = setInterval(() => {
      this.response = loading;
      loading = loading + '.';
    }, 500);

    this.service.getPage(`/proxy/main/${url.value}`).subscribe(data => {
      clearInterval(this.interval);
      translate(element, data.body);
      console.log(data);
      console.log(data.headers.keys());
      this.response = '';
    }, (err) => {
      clearInterval(this.interval);
        this.response = err;
        console.log(err);
    }
    );
  }

}

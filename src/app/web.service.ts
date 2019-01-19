import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WebService {

  constructor(private http: HttpClient) {
  }
  getPage(url: string): Observable<any> {
      return this.http.get(url, {observe: 'response'});
  }

}

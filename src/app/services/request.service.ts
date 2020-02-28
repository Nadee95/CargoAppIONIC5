import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(public http: HttpClient) { }


  makeRequest(reqDto): Observable<any> {
    return this.http
      .post('http://localhost:3000/transport_request/makeRequest', reqDto, this.httpOptions)
      .pipe();
  }
}


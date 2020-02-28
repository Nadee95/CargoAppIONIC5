import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AddDriverPage } from '../pages/add-driver/add-driver.page';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DriverService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) { }


  addDriver(data): Observable<any> {
    return this.http.put(
      "http://localhost:3000/users/addDriver",
      data,
      this.httpOptions
    ); //pipe romoved
  }
}



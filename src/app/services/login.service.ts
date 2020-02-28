import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    // console.log(credentials);
    return this.http.post(
      "http://localhost:3000/users/login",
      credentials,
      this.httpOptions
    ); //pipe romoved
  }
}

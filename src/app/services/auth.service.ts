import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Observable, from, of } from "rxjs";
import { take, map, switchMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";

const helper = new JwtHelperService();
var TOKEN_KEY = "jwt-token";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          let decoded = helper.decodeToken(token);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  async login(credentials) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = { headers: headers };

    //{observe: 'response'}
    return await this.http
      .post("http://localhost:3000/users/login", credentials, {
        observe: "response"
      })
      .pipe(
        map((res: any) => {
          // Extract the JWT
          // console.log(res);
          TOKEN_KEY = res.body.token;
          return TOKEN_KEY;
        }),
        switchMap(token => {
          let decoded = helper.decodeToken(token);
          this.userData.next(decoded);
          let storageObs = from(this.storage.set(TOKEN_KEY, token));
          return storageObs;
        })
      );
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl("/");
      this.userData.next(null);
    });
  }
}

import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from "./auth.service"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = this.authService.getToken();

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('auth_token', idToken)
      });
      return next.handle(cloned);

    } else {
      return next.handle(req);
    }
  }



}

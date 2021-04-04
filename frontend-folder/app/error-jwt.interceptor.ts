import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorJWTInterceptor implements HttpInterceptor {

  constructor(private route:Router,private http:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
          // auto logout if 401 response returned from api
          this.http.logout();
          window.alert("INVALID CREDENTIALS YOU DON'T HAVE PERMISSION TO ACCES THIS PAGE");
          this.route.navigateByUrl("/");
          //location.reload(true);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
  }));
  }
}

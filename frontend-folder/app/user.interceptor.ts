import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private http:UserService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //return next.handle(request);
    
    //let loginUrl="https://localhost:8443/login";
    const authToken = this.http.getToken();
    //const authToken
    if(authToken!=null){
    req = req.clone({
        setHeaders: {
            Authorization: authToken
        }
    });}
    return next.handle(req);
  }
}

import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private http:UserService,private router:Router){

  }
 canActivate():any{
  if(this.http.isAdminloggedIn())
    return true;
  window.alert("Access not allowed!");
  return false;
 }
  
}

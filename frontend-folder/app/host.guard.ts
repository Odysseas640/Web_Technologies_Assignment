import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HostGuard implements CanActivate {
  constructor(private route:Router,private http:UserService){

  }
 canActivate():any{
 /*if(this.http.isHost())
    return true;
  this.http.logout();
  window.alert("INVALID CREDENTIALS YOU DON'T HAVE PERMISSION TO ACCESS THIS PAGE");
  this.route.navigateByUrl("/");
  return false;*/

  return this.http.isHost();
 }
  
}

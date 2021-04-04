import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
//import { Observable } from 'rxjs';
import{UserService} from 'src/app/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route:Router,private http:UserService,private router:Router){

  }
 canActivate():any{
 if(this.http.loggedIn())
    return true;
  this.http.logout();
  window.alert("INVALID CREDENTIALS YOU DON'T HAVE PERMISSION TO ACCESS THIS PAGE");
  this.route.navigateByUrl("/");
  return false;
 }
  
}

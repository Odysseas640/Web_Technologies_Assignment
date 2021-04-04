import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { allowedNodeEnvironmentFlags } from 'process';
import { catchError,tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { observable, Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http:UserService,private route:Router) { }
  username:String="";
  password:String="";
  logged:Boolean;
  errorValue:any;
  
  ngOnInit(): void {


  }
  handleClick(){

    if(this.username=="admin1"){
      this.http.authAdmin(this.password).subscribe(
        res=>{
          console.log(res);
          localStorage.setItem('token', res.headers.get('Authorization'));
          this.route.navigateByUrl("/admin")
        }
      )
    }
    else
    this.http.loginUser(this.username,this.password).subscribe(
      res=>{
        console.log(res);
        console.log(res.status)
        if(res.status==200)
        {
            localStorage.setItem('token', res.headers.get('Authorization'));
            this.logged=true;
            this.http.getUser(this.username);
            this.route.navigateByUrl("/user/:"+this.username);
        }
        
      }
    );
  }
  handleError(){
    alert('INVALID CREDENTIALS PLEASE TRY AGAIN');

  }
}

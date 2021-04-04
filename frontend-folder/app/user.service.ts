import { Injectable } from '@angular/core';
import {User} from 'src/app/models/User'
import { HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { message } from './models/message';
import { catchError, tap } from 'rxjs/operators'; // Important! Be sure to connect operators
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
//import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
//import { maxHeaderSize } from 'http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  tester:User; 
  allUsers: String="https://localhost:8443/api/user";
  constructor(private http: HttpClient) { }

  authAdmin(password:String):Observable<HttpResponse<string>>{
    let loginUrl="https://localhost:8443/login";
    let ln={
      "username":"admin1",
      "password":password
    }
  //  console.log("the fuck's going on??");
  return this.http.post<string>(loginUrl, ln, { observe: 'response'}).pipe(
        tap((data: any) => {
         console.log(data);
    }),
    catchError((err) => {
      window.alert("INVALID CREDENTIALS PLEASE TRY AGAIN");
      throw 'Error in source. Details: ' + err;
    }));;
  }
  XauthAdmin(){
   localStorage.removeItem("token");
  }   
  isAdminloggedIn(){ //here check by login from backend
  var obj:any;
  if(!localStorage.getItem('token'))
    return false;
  let str=localStorage.getItem('token').slice(7);
  if(!str)
    return false;
  obj=atob(str.split('.')[1])
  if(!obj)
    return false;
  let array=obj.split(":");
  if(array.length<2)
    return false;
  let usn=array[1].split(",")[0];
  console.log(usn)///if authentication is successfull then  usn="username"}
  if(usn=='"admin1"')
    return true;
  return false;    
  }   

 
  isAuthenticated(){ //here check by login from backend    
    var obj:any;
   // let usn="-"
    if(!localStorage.getItem('token'))
      return false;
    let str=localStorage.getItem('token').slice(7);
    if(!str)
      return false;
    obj=atob(str.split('.')[1])
    if(!obj)
      return false;
    let array=obj.split(":");
    if(array.length<2)
      return false;
    let usn=array[1].split(",")[0];
    console.log(usn)///if authentication is successfull then  usn="username"}
    if(usn)
      return true;
    return false;
  }
  async isHost(){
    if(!this.isAuthenticated())
      return false;
      ///fill it up
      var obj:any;
      let str=localStorage.getItem('token').slice(7);
      obj=atob(str.split('.')[1])
      let array=obj.split(":");
      let usn=array[1].split(",")[0];
     usn=usn.substring(1, usn.length-1);
     console.log(usn)///if authentication is successfull then  usn="username"}
     let priviledge=await this.http.get("https://localhost:8443/api/user/"+usn+"/is-owner").toPromise();
     console.log(priviledge)
     return priviledge;
  }
  getLastUsr():User
  {
    return this.tester;
  }
  getLoggedInUser():Observable<string>
  {
    return this.http.get("https://localhost:8443/api/user/UserName",{ responseType: 'text'});
  }
  getUser(usn:String) :Observable<User>
  {
    let url="https://localhost:8443/api/user/"+usn;
    this.http.get<User>(url).subscribe(data=>this.tester=data);
    return this.http.get<User>(url);
  }
  getAllUsers() :Observable<User[]>
  {

    return this.http.get<User[]>(this.allUsers.toString());
  }
  getAllUserNames() :Observable<String[]>{
    return this.http.get<String[]>("https://localhost:8443/api/user/usernames");
  }
  getAllRequestingUsers(): Observable<User[]>
  {
    return this.http.get<User[]>("https://localhost:8443/api/admin/GetAllRequests");
  }
  confirmRequest(username:String): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    
    let tempUrl="https://localhost:8443/api/admin/User";
    console.log(username);
    let body={
            "username":username
    }
    let subscription="";
    this.http.post<String>(tempUrl,body,httpOptions).subscribe(result=> subscription=result.toString());
  }
  //////////////////////////////////////////////////
  newUser(usr :User,file): Boolean{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json'},    
    };
    let tempUrl="https://localhost:8443/api/user";
    let subscription="";
    let body={
      "username":usr.userName,
      "password":usr.password,
      "email":usr.email,
       "phonenumber":usr.phoneNumber,
      "firstname":usr.firstName,
      "lastname":usr.lastName,
      "Request":"false",
      "renterReq":usr.renter
  };

    if(usr.requestforOwner)
    {
      body={
        "username":usr.userName,
        "password":usr.password,
        "email":usr.email,
         "phonenumber":usr.phoneNumber,
        "firstname":usr.firstName,
        "lastname":usr.lastName,
         "Request":"true",
         "renterReq":usr.renter
        }
    };
    let str=""
   this.getAllUserNames().subscribe(
     res=>
     {
        res.forEach(element=>{
          if(element==usr.userName)
            {
              str=element.toString();
              alert("USERNAME ALLREADY EXITS")
              return false;
            }
        })
      }
   )
   if(str)
      {
        alert("USERNAME ALLREADY EXITS")
              return;
      }
    this.http.post<String>(tempUrl,body).subscribe(
      result=> 
       console.log(result)
    );
    return true;
  }
  uploadProfilePic(usn:String,picture){
    console.log("whyyyyyyyyyy");
    let url="https://localhost:8443/api/user/ProfilePic/"+usn;
    this.http.put(url,picture).subscribe(
      res=>{
        console.log(res)
      //  this.usr.pic=event.target.files[0];
     //   this.usr.pic=res;
            }
    )
  }
  changePassword(usr :User,identifier:String,newPassword :String):Boolean{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    if(usr.password != identifier)
      return false; //WRONG PASSWORD
    let tempUrl="https://localhost:8443/api/user/"+usr.userName;
    let subscription="";
    let body={
      "newPassword":newPassword,
      "LastName":usr.lastName,
      "FirstName":usr.firstName,
      "email":usr.email
    }
    this.http.put<String>(tempUrl,body,httpOptions).subscribe(result => subscription=result.toString());
    return true;
    
  }
  //////////////////////////////////////////
  changeEmail(usr:User, newEmail:String):Boolean
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    let tempUrl="https://localhost:8443/api/user/"+usr.userName;
    let subscription="";
    let body={
      "newPassword":usr.password,
      "LastName":usr.lastName,
      "FirstName":usr.firstName,
      "email":newEmail
    }
    this.http.put<String>(tempUrl,body,httpOptions).subscribe(result => subscription=result.toString());
    return true;
  }
  loggedIn(){ 
    if(!this.isAuthenticated())
      return false;
    return true;
  }
  
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem("token");
  }
  messageUsr(sender:String,receiver:String,date:String,text:String,Appid:Number){
    let url="https://localhost:8443/accesories/messages"
    let body={
      "receiver":receiver,
      "sender":sender,
      "date":date,
      "text":text,
      "appId":Appid
    };
    let subscription="";
    this.http.post<String>(url,body).subscribe(
      data=>{
        subscription=data.toString();
        console.log(data)
      }
    );
  }
  getMessages(usn:String):Observable<message[]>{
    let url="https://localhost:8443/accesories/messages/getAllByUsr/?receiver="+usn;
    console.log("fuck");
    return this.http.get<message[]>(url);
      
  }
  getMessagesBySenderAndReceiver(sender:String,receiver:String):Observable<message[]>
  {
    let url="https://localhost:8443/accesories/messages/duplex?receiver="+sender+"&sender="+receiver;
    console.log(url);
    return this.http.get<message[]>(url);
    // return null;
  }
  changeNumber(usn:String,phoneNumber:String){
    let body={
      "username":usn,
      "phone":phoneNumber
    };
    let url="https://localhost:8443/api/EditUserData/Phone";
    this.http.put<String>(url,body).subscribe(
      data=>{
        console.log(data);
      }
    );
  }
  loginUser(usn:String,password:String){
    let loginUrl="https://localhost:8443/login";
    let ln={
      "username":usn,
      "password":password
    }
    return this.http.post<string>(loginUrl, ln, { observe: 'response'}).pipe(
      tap((data: any) => {
          console.log(data);
          localStorage.setItem('token', data.headers.get('Authorization'));
         
      }),
      catchError((err) => {
        window.alert("INVALID CREDENTIALS PLEASE TRY AGAIN");
        throw 'Error in source. Details: ' + err;
      })
  );
  }
  updateUser(usr:User){
    let url="https://localhost:8443/api/user/"+usr.userName;
    let body={
      "LastName":usr.lastName,
      "FirstName":usr.firstName,
      "PhoneNumber":usr.phoneNumber,
      "email":usr.email,
      "newPassword":usr.password
    }
    this.http.put(url,body).subscribe(
      res=>
      {
        console.log(res);
      }
    )
  }
  markBooking(id:number){
    let url="https://localhost:8443/api/Bookings/"+id;
    this.http.put(url,{}).subscribe(
      res=>console.log(res)
    );
  }
}


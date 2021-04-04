import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { SingupComponent } from './singup/singup.component';
import { AppartmentDetailsComponent } from './appartment-details/appartment-details.component';
import { AuthGuard } from './auth.guard';
import { ManageAppartmentsComponent } from './manage-appartments/manage-appartments.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminGuard } from './admin.guard';
import { AddAppartmentComponent } from './add-appartment/add-appartment.component';
import { ManageApp1Component } from './manage-app1/manage-app1.component';
import { MessageExchangeComponent } from './message-exchange/message-exchange.component';
import { LoginComponent } from './login/login.component';
import { AppartmentComponent } from './appartment/appartment.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { HostGuard } from './host.guard';

///I NEED TO ADD ADMIN GUARD FOR ADMIN PAGE AND USER DETAILS PAGE
///I ALSO NEET TO ADD HOST GUARD FOR ADD-APPARTMENT
///MANAGEAPP AND MANAGEAPP1
const routes: Routes = [
  {path:"",component:AppartmentComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminComponent,canActivate:[AdminGuard]},
  {path:"user/:userName",component:UserComponent,canActivate:[AuthGuard]},
  {path:'manageApp1/:id',component:ManageApp1Component,canActivate:[HostGuard]}/*later change it*/,
  {path:"add-appartment/:userName",component:AddAppartmentComponent,canActivate:[HostGuard]},
  {path:"userDetails/:userName",component:UserDetailsComponent,canActivate:[AdminGuard]},
  {path:"signUp",component:SingupComponent},
  {path:"Recomended",component:RecommendedComponent,canActivate:[AuthGuard]},
  {path:"manageApp",component:ManageAppartmentsComponent, canActivate:[HostGuard]},
  {path:"appDetails/:id/:startD/:endD",component:AppartmentDetailsComponent},
  {path:"search/:startD/:endD/:capacity/:country/:city/:neighborhood/:wifi/:tv/:pets/:parking/:desiredType/:ac/:smoking/:elevator/:maxCost",component:SearchResultsComponent},
  { path:'editProfile', loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule) ,canActivate:[AuthGuard] },
  { path: 'appartment', loadChildren: () => import('./appartment/appartment.module').then(m => m.AppartmentModule) },
  {path:"chat/:receiver/:appartment",component:MessageExchangeComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

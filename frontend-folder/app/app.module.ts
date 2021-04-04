import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Add this
import { Observable } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import {map, startWith} from 'rxjs/operators';
import { DatePipe } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {UserService} from 'src/app/user.service';
import { SingupComponent } from './singup/singup.component';
import { AppartmentDetailsComponent } from './appartment-details/appartment-details.component';
import { AppartmentService } from './appartment.service';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './user.interceptor';
import { ManageAppartmentsComponent } from './manage-appartments/manage-appartments.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddAppartmentComponent } from './add-appartment/add-appartment.component';
import { ManageApp1Component } from './manage-app1/manage-app1.component';
import { ReplyComponent } from './reply/reply.component';
import { MessageExchangeComponent } from './message-exchange/message-exchange.component';
import { LoginComponent } from './login/login.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RecommendedComponent } from './recommended/recommended.component';
//import { AngularOpenlayersModule } from 'ngx-openlayers';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    SingupComponent,
    AppartmentDetailsComponent,
    ManageAppartmentsComponent,
    UserDetailsComponent,
    AddAppartmentComponent,
    ManageApp1Component,
    ReplyComponent,
    MessageExchangeComponent,
    LoginComponent,
    SearchResultsComponent,
    RecommendedComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //AngularOpenlayersModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [UserService,DatePipe,AppartmentService,AuthGuard,  {
    provide: HTTP_INTERCEPTORS,
    useClass: UserInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

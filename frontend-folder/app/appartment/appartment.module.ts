import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module



import { AppartmentRoutingModule } from './appartment-routing.module';
import { AppartmentComponent } from './appartment.component';


@NgModule({
  declarations: [AppartmentComponent,  
  ],
  imports: [
    CommonModule,
    AppartmentRoutingModule,
    FormsModule, // <-- add this
    NgxPaginationModule

  ]
})
export class AppartmentModule { }

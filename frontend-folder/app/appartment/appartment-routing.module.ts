import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppartmentComponent } from './appartment.component';

const routes: Routes = [{ path: '', component: AppartmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppartmentRoutingModule { }

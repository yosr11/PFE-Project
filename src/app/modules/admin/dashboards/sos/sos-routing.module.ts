import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SOSComponent } from './sos.component';
const routes: Routes = [
  {path:'',component:SOSComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SOSRoutingModule { }

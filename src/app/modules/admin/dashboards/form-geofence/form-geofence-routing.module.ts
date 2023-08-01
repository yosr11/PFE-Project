import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGeofenceComponent } from './form-geofence.component';
const routes: Routes = [
  {path:'',component:FormGeofenceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormGeofenceRoutingModule { }

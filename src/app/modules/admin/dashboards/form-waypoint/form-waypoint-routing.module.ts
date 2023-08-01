import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaypointComponent } from '../outils-navigation/waypoint/waypoint.component';
import { FormWaypointComponent } from './form-waypoint.component';

const routes: Routes = [
  {path:'',component:FormWaypointComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormWaypointRoutingModule { }

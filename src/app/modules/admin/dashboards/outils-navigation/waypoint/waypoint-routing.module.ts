import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaypointComponent } from './waypoint.component';

const routes: Routes = [
  {path:'',component:WaypointComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaypointRoutingModule { }

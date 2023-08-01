import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaypointDialogComponent } from './waypoint-dialog.component';

const routes: Routes = [
  {
    path:'',component:WaypointDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaypointDialogRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditGeofenceComponent } from './editgeofence.component';

const routes: Routes = [
  {path:'',component:EditGeofenceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditgeofenceRoutingModule { }

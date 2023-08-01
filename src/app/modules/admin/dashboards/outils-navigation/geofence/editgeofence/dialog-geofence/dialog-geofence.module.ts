import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'
import { DialogGeofenceRoutingModule } from './dialog-geofence-routing.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogGeofenceRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class DialogGeofenceModule { }

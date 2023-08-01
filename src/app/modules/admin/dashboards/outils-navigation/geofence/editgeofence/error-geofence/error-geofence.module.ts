import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'
import { ErrorGeofenceRoutingModule } from './error-geofence-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorGeofenceRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ErrorGeofenceModule { }

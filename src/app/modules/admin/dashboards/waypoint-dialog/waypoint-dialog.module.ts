import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaypointDialogRoutingModule } from './waypoint-dialog-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { WaypointDialogComponent } from './waypoint-dialog.component';
@NgModule({
  declarations: [WaypointDialogComponent],
  imports: [
    CommonModule,
    WaypointDialogRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule
  ]
  
})
export class WaypointDialogModule { }

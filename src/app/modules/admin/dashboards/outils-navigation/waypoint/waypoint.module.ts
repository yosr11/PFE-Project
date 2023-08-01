import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaypointRoutingModule } from './waypoint-routing.module';
import { WaypointComponent } from './waypoint.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    WaypointComponent,
    
  ],
  imports: [
    CommonModule,
    WaypointRoutingModule,
    MatIconModule
  ]
})
export class WaypointModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormWaypointRoutingModule } from './form-waypoint-routing.module';
import { FormsModule } from '@angular/forms';
import { FormWaypointComponent } from './form-waypoint.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { WaypointErrorComponent } from './waypoint-error/waypoint-error.component';
import { AddwaypointDialogComponent } from './addwaypoint-dialog/addwaypoint-dialog.component';
@NgModule({
  declarations: [ FormWaypointComponent, 
     WaypointErrorComponent,
      AddwaypointDialogComponent],
  imports: [
    CommonModule,
    FormWaypointRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class FormWaypointModule { }

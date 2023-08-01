import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditgeofenceRoutingModule } from './editgeofence-routing.module';
import { EditGeofenceComponent } from './editgeofence.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogGeofenceComponent } from './dialog-geofence/dialog-geofence.component';
import { ErrorGeofenceComponent } from './error-geofence/error-geofence.component';


@NgModule({
  declarations: [
    EditGeofenceComponent,
    DialogGeofenceComponent,
    ErrorGeofenceComponent
  ],
  imports: [
    CommonModule,
    EditgeofenceRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  
})
export class EditgeofenceModule { }

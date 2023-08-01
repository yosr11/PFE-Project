import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGeofenceRoutingModule } from './form-geofence-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGeofenceComponent } from './form-geofence.component';

@NgModule({
  declarations: [
    FormGeofenceComponent
  ],
  imports: [
    CommonModule,
    FormGeofenceRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormGeofenceModule { }


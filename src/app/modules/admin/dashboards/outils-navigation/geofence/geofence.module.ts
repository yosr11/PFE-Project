import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeofenceRoutingModule } from './geofence-routing.module';
import { GeofenceComponent } from './geofence.component';

//import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'environments/environment';
import { GeofenceService } from './geofence.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
//import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GeofenceComponent,
 
  ],
  imports: [
    CommonModule,
    GeofenceRoutingModule,
    MatIconModule,
    //AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    //MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
 providers:[GeofenceService]
})
export class GeofenceModule { }

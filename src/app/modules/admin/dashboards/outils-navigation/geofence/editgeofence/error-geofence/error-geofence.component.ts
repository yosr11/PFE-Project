import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-geofence',
  templateUrl: './error-geofence.component.html',
  styleUrls: ['./error-geofence.component.scss']
 
})

export class ErrorGeofenceComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}


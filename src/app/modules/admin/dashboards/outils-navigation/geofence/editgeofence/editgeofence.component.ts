import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDialogRef } from '@angular/material/dialog';
import { GeofenceComponent } from '../geofence.component';
import * as L from 'leaflet';
import 'leaflet-draw';
import { EditGeofenceService } from './edit-geofence.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogGeofenceComponent } from './dialog-geofence/dialog-geofence.component';
import { ErrorGeofenceComponent } from './error-geofence/error-geofence.component';
@Component({
  selector: 'app-editgeofence',
  templateUrl: './editgeofence.component.html',
  styleUrls: ['./editgeofence.component.scss']
})
export class EditGeofenceComponent implements OnInit {
  Geofenceform: FormGroup;
  Geofence: any;

  radius: number;
  marker: L.Marker;
  circle: L.Circle;
  myMap: L.Map;
  @ViewChild(GeofenceComponent) GeofenceComponent: GeofenceComponent;
  constructor(private fb: FormBuilder,
    private editgeofenceService: EditGeofenceService,
    private _dialog:MatDialog,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<EditGeofenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.Geofenceform = this.fb.group({
      radius: ['', Validators.required]
    });
  }


  ngOnInit() {

    const id_bateau = Number(sessionStorage.getItem('id_bateau')?.match(/\d+/)[0]);
    this.editgeofenceService.getGeofence((id_bateau)).subscribe(
      (data) => {
        console.log('Client data from server:', data);
        this.Geofence = data[0]; // assign the retrieved client data to the client variable
        this.Geofenceform.patchValue({
          radius: this.Geofence.radius,
        });
        console.log('Form after patch:', this.Geofenceform);
        this.cdr.detectChanges(); // force the update of the view
      },
      (error) => {
        console.error('Error while retrieving client data:', error);
      }
    );
  }
  edit() {
    const id_bateau = Number(sessionStorage.getItem('id_bateau')?.match(/\d+/)[0]);
    const geofence = {

      radius: this.Geofenceform.value.radius,
    }
    console.log("id_bateau:", id_bateau);
    console.log("geofence:", geofence);
    this.editgeofenceService.updategeofence(id_bateau, geofence).subscribe(
      (response: any) => {
        // Handle success response
        console.log(response);
        const dialogRef = this._dialog.open( DialogGeofenceComponent, {
          data: { message: 'Geofence modifiée' },
      });
        this.data[0];
        // Fermer la boîte de dialogue et afficher la nouvelle géo-clôture
        this.dialogRef.close('saved');
      },
      (error:any) => {
        console.error(error);
              const dialogRef = this._dialog.open(ErrorGeofenceComponent, {
                  data: { message: 'Échec de modification' },
              });
      }
    )
  };

}

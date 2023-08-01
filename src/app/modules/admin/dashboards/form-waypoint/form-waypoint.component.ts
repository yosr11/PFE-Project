import { Component, OnInit ,Inject ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaypointService } from '../outils-navigation/waypoint/waypoint.service';
import { WaypointComponent } from '../outils-navigation/waypoint/waypoint.component';
import { MatDialog } from '@angular/material/dialog';
import { AddwaypointDialogComponent } from './addwaypoint-dialog/addwaypoint-dialog.component';
import { WaypointErrorComponent } from './waypoint-error/waypoint-error.component';

@Component({
  selector: 'app-form-waypoint',
  templateUrl: './form-waypoint.component.html',
  styleUrls: ['./form-waypoint.component.scss']
})
export class FormWaypointComponent implements OnInit {

latitude:number;
longitude:number;
@ViewChild(WaypointComponent) waypointComponent: WaypointComponent;
  constructor(private fb: FormBuilder,
              private http:HttpClient,
              private dialogRef:DialogRef,
              private waypointService: WaypointService,
              private _dialog:MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  waypointForm: FormGroup;
  ngOnInit() {
    this.waypointForm = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
      
    });
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      // Mettre à jour les valeurs du formulaire avec la latitude et la longitude
      this.waypointForm.patchValue({
        latitude: latitude,
        longitude: longitude
      });
    });
  }

  ajout() {
    const boat = {
      name: this.waypointForm.value.name,
      latitude: this.waypointForm.value.latitude,
      longitude: this.waypointForm.value.longitude
    };
    const id_bateau = Number(sessionStorage.getItem('id_bateau')?.match(/\d+/)[0]);
  
    if (id_bateau) {
      this.http.post<any>(`http://localhost:3000/waypoint/ajout/${id_bateau}`, boat).subscribe(
        (response:any) => {
          const dialogRef = this._dialog.open(AddwaypointDialogComponent, {
            data: { message: ' waypoint ajoutée' },
        });
       
      this.data.WaypointComponent.refreshwaypoint();
      this.dialogRef.close('saved');
    },
    (error: any) => {
      console.error(error);
              const dialogRef = this._dialog.open(WaypointErrorComponent, {
                  data: { message: 'Échec d\'ajout bateau' },
              });
    }
  );
    }
  }
  }

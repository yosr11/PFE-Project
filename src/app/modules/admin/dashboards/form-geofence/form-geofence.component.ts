import { Component,ViewChild,Inject ,OnInit} from '@angular/core';
import { GeofenceComponent } from '../outils-navigation/geofence/geofence.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-form-geofence',
  templateUrl: './form-geofence.component.html',
  styleUrls: ['./form-geofence.component.scss']
})
export class FormGeofenceComponent implements OnInit {
  @ViewChild(GeofenceComponent) GeofenceComponent: GeofenceComponent;
  constructor(private fb: FormBuilder,
    private http:HttpClient,
    private dialogRef:DialogRef,
    private _dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
GeoForm: FormGroup;
ngOnInit(){
  this.GeoForm = this.fb.group({
    radius: ['', Validators.required],
  });
}
ajout() {
  const geofence = {
    radius: this.GeoForm.value.radius,
  };
  const id_bateau = Number(sessionStorage.getItem('id_bateau')?.match(/\d+/)[0]);

  if (id_bateau) {
    this.http.post<any>(`http://localhost:3000/geofence/ajout/${id_bateau}`, geofence).subscribe(
      (response:any) => {
    this.data.GeofenceComponent.refreshgeofence();
    this.dialogRef.close('saved');
  },
  
);
  }
}
}

import { Component, OnInit, ViewChild,AfterViewInit, Inject,EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ListeBateauxService } from '../liste-bateaux/liste-bateaux.service';
import { ListeBateauxComponent, PeriodicElement } from '../liste-bateaux/liste-bateaux.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BoatDialogComponent } from './boat-dialog/boat-dialog.component';
import { BoatErrorComponent } from './boat-error/boat-error.component';
@Component({
  selector: 'app-form-bateau',
  templateUrl: './form-bateau.component.html',
  styleUrls: ['./form-bateau.component.scss']
})
export class FormBateauComponent implements OnInit {
  boatForm: FormGroup;
  boitier_imei:number;
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(ListeBateauxComponent) listeBateauxComponent: ListeBateauxComponent;
  // declare output event
  @Output() bateauAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private listeBateauxService: ListeBateauxService,
    public dialogRef: MatDialogRef<FormBateauComponent>,
    private _dialog:MatDialog,
   
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.dataSource = new MatTableDataSource<PeriodicElement>();
  }

  ngOnInit() {
    this.boatForm = this.fb.group({
      name: ['', Validators.required],
      boitier_imei: ['', [Validators.required, Validators.pattern(/^\d{15}$/)]],
      boitier_phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }
  
  ajout() {
    const boat = {
      name: this.boatForm.value.name,
      boitier_imei: this.boatForm.value.boitier_imei,
      boitier_phone: this.boatForm.value.boitier_phone
    };
    const id_client = Number(sessionStorage.getItem('id_client')?.match(/\d+/)[0]);
  
    if (id_client) {
      this.http.post<any>(`http://localhost:3000/bateau/ajout/${id_client}`, boat).subscribe(
        
      (response:any) => {
       
        const dialogRef = this._dialog.open(BoatDialogComponent, {
          data: { message: ' Bateau ajoutée' },
          
      });
      this.data.listeBateauxComponent.refreshBoats();
      this.dialogRef.close('saved');
    },
    (error: any) => {
      console.error(error);
              const dialogRef = this._dialog.open(BoatErrorComponent, {
                  data: { message: 'Échec d\'ajout bateau' },
              });
    });
  }
}
}




    
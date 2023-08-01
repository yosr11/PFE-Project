import { Component, Inject, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListeBateauxService } from '../liste-bateaux/liste-bateaux.service';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {  PeriodicElement } from '../liste-bateaux/liste-bateaux.component';
import { Router } from '@angular/router';
import { ListeBateauxComponent } from '../liste-bateaux/liste-bateaux.component';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { EditErrorComponent } from './edit-error/edit-error.component';

@Component({
  selector: 'app-edit-bateau',
  templateUrl: './edit-bateau.component.html',
  styleUrls: ['./edit-bateau.component.scss']
})
export class EditBateauComponent implements OnInit {
  form: FormGroup;
  bateau: any;
 
  displayedColumns: string[] = ['name', 'boitier_imei', 'boitier_phone'];
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(ListeBateauxComponent) listeBateauxComponent: ListeBateauxComponent;
  @Input() element: any;
  @ViewChild(MatTable, { static: false }) set table(table: MatTable<PeriodicElement>) { }
 


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditBateauComponent>,
    private listeBateauxService: ListeBateauxService,
    private route: Router,
    private dataService: ListeBateauxService,
    private _dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.dataSource = new MatTableDataSource<PeriodicElement>();
  }

  ngOnInit() {
    if (this.data && this.data.bateau) {
      this.bateau = this.data.bateau;
      this.form = this.fb.group({
        name: [this.bateau.name, Validators.required],
        boitier_imei: [this.bateau.boitier_imei, [Validators.required, Validators.pattern(/^\d{15}$/)]],
        boitier_phone: [this.bateau.boitier_phone,[Validators.required, Validators.pattern(/^\d{8}$/)]]
      });
    }
  }
  
  
 // Fonction appelée lorsque l'utilisateur clique sur le bouton "Enregistrer" dans la boîte de dialogue
 onSave() {
  const boat = {
    name: this.form.value.name,
    boitier_imei: this.form.value.boitier_imei,
    boitier_phone: this.form.value.boitier_phone
  };
  
  if (this.data.bateau.id_client && this.data.bateau.id_bateau) {
    this.listeBateauxService.updateBateau(this.data.bateau.id_client, this.data.bateau.id_bateau, boat).subscribe(
      (response:any) => {
        const dialogRef = this._dialog.open(EditDialogComponent, {
          data: { message: ' Bateau modifiée' },
      });
     
      this.dialogRef.close('saved'); 
    },
    (error: any) => {
      console.error(error);
              const dialogRef = this._dialog.open(EditErrorComponent, {
                  data: { message: 'Échec de modification bateau' },
              });
    });
}
    }
  
  }
  
 
  

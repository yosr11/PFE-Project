import { Component ,ViewChild,AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatTable} from '@angular/material/table';
import { Router } from '@angular/router';
import { ListeBateauxService,  } from './liste-bateaux.service';
import { MatDialog} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { EditBateauComponent } from '../edit-bateau/edit-bateau.component';
import { FormBateauComponent } from '../form-bateau/form-bateau.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

export interface PeriodicElement {
  name:string;
  boitier_phone: number;
  boitier_imei: string;
  edit?: boolean;
 
}
@Component({
  selector: 'app-liste-bateaux',
  templateUrl: './liste-bateaux.component.html',
  styleUrls: ['./liste-bateaux.component.scss'],
  providers: [ListeBateauxService]
})

export class ListeBateauxComponent implements OnInit {
  displayedColumns: string[] = ['image','name','boitier_imei','boitier_phone', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  @Input() element: any;
  @ViewChild(MatTable, { static: false }) set table(table: MatTable<PeriodicElement>) {
  }
  
  id_bateau: number;
  id_client: number;
  connectedClientId: string;
  latitude:number;
  longitude:number;
  speed:number;

  constructor(
    private router: Router,
    private dataService: ListeBateauxService,
    public dialog: MatDialog,
    private http: HttpClient,
    private listeBateauxService: ListeBateauxService,
    private updateService: ListeBateauxService,
    private _dialog:MatDialog
     // add this line
  ) {}
 

  refreshBoats() {
    const id_client = Number(sessionStorage.getItem('id_client')?.match(/\d+/)[0]);
    if (id_client) {
      this.dataService.getBateauxByClientId(id_client).subscribe((data: PeriodicElement[]) => {
        this.dataSource.data = data;
      
      });
    }
  }
  
  ngOnInit() {
    this. refreshBoats();
  }
//add  boat
  addData() {
    const dialogRef = this.dialog.open(FormBateauComponent, {
      data: { listeBateauxComponent: this }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved') {
        this.refreshBoats();
      }
    });
    
  }

  //supprimer un boat
  removeData(element:any) {
    const boitier_imei = element.boitier_imei;
    
    const id_client = Number(sessionStorage.getItem('id_client')?.match(/\d+/)[0]);
  
    if(id_client) {
      // Stocker l'ID du bateau dans le storage de session
    sessionStorage.setItem('boitier_imei', boitier_imei );
    
      // Supprimer le bateau
      this.listeBateauxService.DeleteBateau(id_client, boitier_imei).subscribe(
        (response:any) => {
          const dialogRef = this._dialog.open(EditDialogComponent, {
            data: { message: ' Votre bateau est supprimé avec succès' },
        });
        const index = this.dataSource.data.indexOf(element) ;
        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
          this.router.navigate(['/dashboards/listeBateaux']);
        }
      });
    }
  }
  editData(element:any) {
     const id_bateau = element.id_bateau;
    const id_client = Number(sessionStorage.getItem('id_client')?.match(/\d+/)[0]);
    if(id_client) {
      
    const dialogRef = this.dialog.open(EditBateauComponent, {
      data: { bateau: element }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved') {
        // Stocker l'ID du bateau dans le storage de session
      sessionStorage.setItem('id_bateau', id_bateau );
        this.latitude = undefined;
        this.longitude = undefined;
        this.speed = undefined;
        this.refreshBoats();
      }
    });
  }
  
}
    Details(element:any){
      const id_bateau = element.id_bateau;
      const boitier_imei = element.boitier_imei;
     const boitier_phone = element.boitier_phone;
      
      const id_client = Number(sessionStorage.getItem('id_client')?.match(/\d+/)[0]);
      if(id_client) {
        // Stocker l'ID du bateau dans le storage de session
        sessionStorage.setItem('id_bateau', id_bateau );
        sessionStorage.setItem('boitier_imei', boitier_imei );
        sessionStorage.setItem('boitier_phone', boitier_phone );
      this.router.navigateByUrl('/dashboards/navigation');
    }
    this.listeBateauxService.getBateauById(id_bateau).subscribe((boitier_imei) => {
      
      sessionStorage.setItem('boitier_imei', JSON.stringify(boitier_imei));
    });
  }
}

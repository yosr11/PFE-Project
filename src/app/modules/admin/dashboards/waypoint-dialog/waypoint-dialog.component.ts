import { Component, Inject ,AfterViewInit,OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { WaypointDialogService } from './waypoint-dialog.service';
import { ChangeDetectorRef } from '@angular/core';
export interface waypoint {
  name:string;
  latitude: number;
  longitude: number;
}
@Component({
  selector: 'app-waypoint-dialog',
  templateUrl: './waypoint-dialog.component.html',
  styleUrls: ['./waypoint-dialog.component.scss']
})
export class WaypointDialogComponent implements OnInit{
  displayedColumns: string[] = ['name','latitude','longitude'];
  dataSource = new MatTableDataSource<waypoint>([]);

  constructor(
    public dialogRef: MatDialogRef<WaypointDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
  
    ngOnInit(): void {
      // Initialisez la propriété dataSource avec un tableau vide
      this.dataSource.data = [];
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ListeBateauxRoutingModule } from './liste-bateaux-routing.module';
import { ListeBateauxComponent } from './liste-bateaux.component';
import { MatTableModule } from '@angular/material/table';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ListeBateauxComponent,
    EditDialogComponent
  ],
  imports: [
    MatIconModule,
    MatTableModule,
    CommonModule,
    ListeBateauxRoutingModule,
    MatDialogModule,
   
  ]
})
export class ListeBateauxModule { }

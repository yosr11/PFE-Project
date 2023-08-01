import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDialogRoutingModule } from './edit-dialog-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EditDialogRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class EditDialogModule { }

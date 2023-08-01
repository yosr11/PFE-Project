import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogRoutingModule } from './error-dialog-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorDialogRoutingModule,
    MatDialogModule
  ]
})
export class ErrorDialogModule { }

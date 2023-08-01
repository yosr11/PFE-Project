import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessModificationRoutingModule } from './success-modification-routing.module';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SuccessModificationRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SuccessModificationModule { }

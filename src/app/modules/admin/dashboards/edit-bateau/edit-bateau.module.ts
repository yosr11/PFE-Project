import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBateauComponent } from './edit-bateau.component';
import { EditBateauRoutingModule } from './edit-bateau-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { EditErrorComponent } from './edit-error/edit-error.component';

@NgModule({
  declarations: [
    EditBateauComponent,
    EditDialogComponent,
    EditErrorComponent
  ],
  imports: [
    CommonModule,
    EditBateauRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ]
})
export class EditBateauModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBateauRoutingModule } from './form-bateau-routing.module';
import { FormBateauComponent } from './form-bateau.component';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { BoatDialogComponent } from './boat-dialog/boat-dialog.component';
import { BoatErrorComponent } from './boat-error/boat-error.component';

@NgModule({
  declarations: [
    FormBateauComponent,
    BoatDialogComponent,
    BoatErrorComponent
  ],
 
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormBateauRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    FuseCardModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormBateauModule { }

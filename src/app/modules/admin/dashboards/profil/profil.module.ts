import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider'; // Import MatDividerModule instead of MatDivider
import { MatIconModule } from '@angular/material/icon';
import { SuccessModificationComponent } from './success-modification/success-modification.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ErrorModificationComponent } from './error-modification/error-modification.component';

@NgModule({
  declarations: [
    ProfilComponent,
    SuccessModificationComponent,
    ErrorModificationComponent
  ],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ProfilModule { }

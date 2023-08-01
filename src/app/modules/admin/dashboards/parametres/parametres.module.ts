import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametresRoutingModule } from './parametres-routing.module';
import { ParametresComponent } from './parametres.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    ParametresComponent
  ],
  imports: [
    CommonModule,
    ParametresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule
  ]
})
export class ParametresModule { }

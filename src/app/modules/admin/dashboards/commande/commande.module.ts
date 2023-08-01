import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeComponent } from './commande.component';
import { CommandeRoutingModule } from './commande-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
   CommandeComponent,
   
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    
  ]
})
export class CommandeModule { }

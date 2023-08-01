import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsBateauRoutingModule } from './details-bateau-routing.module';
import { DetailsBateauComponent } from './details-bateau.component';


@NgModule({
  declarations: [
    DetailsBateauComponent
  ],
  imports: [
    CommonModule,
    DetailsBateauRoutingModule
  ]
})
export class DetailsBateauModule { }

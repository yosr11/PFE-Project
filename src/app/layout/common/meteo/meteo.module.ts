import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeteoRoutingModule } from './meteo-routing.module';
import { MeteoComponent } from './meteo.component';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MeteoComponent
  ],
  imports: [
    CommonModule,
    MeteoRoutingModule,
    MatIconModule,
   
  ],
  providers: [
    DatePipe
  ]
})
export class MeteoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { ControleRoutingModule } from './controle-routing.module';
import { ControleComponent } from './controle.component';
import { MatIconModule } from '@angular/material/icon';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFireAnalyticsModule} from '@angular/fire/compat/analytics'
import { environment } from 'environments/environment';


@NgModule({
  declarations: [
    ControleComponent
  ],
  imports: [
    CommonModule,
    ControleRoutingModule,
    HighchartsChartModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAnalyticsModule
  ]
})
export class ControleModule { }

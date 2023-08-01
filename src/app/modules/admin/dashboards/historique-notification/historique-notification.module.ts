import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoriqueNotificationRoutingModule } from './historique-notification-routing.module';
import { HistoriqueNotificationComponent } from './historique-notification.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    HistoriqueNotificationComponent
  ],
  imports: [
    CommonModule,
    HistoriqueNotificationRoutingModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
})
export class HistoriqueNotificationModule { }

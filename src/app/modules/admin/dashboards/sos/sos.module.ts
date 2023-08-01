import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SOSRoutingModule } from './sos-routing.module';
import { SOSComponent } from '../sos/sos.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'environments/environment';
import { SosService } from './sos.service';
import { NotificationCommunicationService } from 'notification-communication.service'; 
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@NgModule({
  declarations: [
    SOSComponent
  ],
  imports: [
    CommonModule,
    SOSRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    //BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() 
    
  ],
  providers: [SosService,ToastrService ]
})
export class SOSModule { }

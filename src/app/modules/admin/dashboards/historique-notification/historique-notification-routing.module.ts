import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriqueNotificationComponent } from './historique-notification.component';

const routes: Routes = [
  {
    path     : '',
        component:HistoriqueNotificationComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriqueNotificationRoutingModule { }

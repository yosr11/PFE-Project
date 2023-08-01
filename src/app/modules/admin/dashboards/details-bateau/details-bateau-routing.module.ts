import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsBateauComponent } from './details-bateau.component';
import { DetailsBateauModule } from './details-bateau.module';

const routes: Routes = [
  {path:'',component:DetailsBateauComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsBateauRoutingModule { }

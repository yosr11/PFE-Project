import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBateauComponent } from './form-bateau.component';


const routes: Routes = [
  {path:'',component:FormBateauComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormBateauRoutingModule { }

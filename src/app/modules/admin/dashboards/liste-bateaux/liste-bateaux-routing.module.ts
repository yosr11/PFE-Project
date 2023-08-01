import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeBateauxComponent } from './liste-bateaux.component';

const routes: Routes = [
  {path:'',component:ListeBateauxComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListeBateauxRoutingModule { }

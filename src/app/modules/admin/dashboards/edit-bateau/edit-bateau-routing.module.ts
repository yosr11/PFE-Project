import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBateauComponent } from './edit-bateau.component';
const routes: Routes = [
  {path:'',component:EditBateauComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBateauRoutingModule { }

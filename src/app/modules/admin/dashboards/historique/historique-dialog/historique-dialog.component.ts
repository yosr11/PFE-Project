import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-historique-dialog',
  template:`<h2 mat-dialog-title>Error!</h2>
  <mat-dialog-content>{{ data.message }}</mat-dialog-content>
  <mat-dialog-actions>
      <button mat-raised-button class="bg-gradient-to-r from-blue-900 to-blue-300" mat-dialog-close>OK</button>
  </mat-dialog-actions>
`,
})
export class HistoriqueDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

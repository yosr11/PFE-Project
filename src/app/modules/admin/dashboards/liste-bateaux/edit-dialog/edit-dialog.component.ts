import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  template:`<h2 mat-dialog-title>Succès</h2>
  <mat-dialog-content>{{ data.message }}</mat-dialog-content>
`,
})
export class EditDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

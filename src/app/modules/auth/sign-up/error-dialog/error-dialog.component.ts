import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
  <h2 mat-dialog-title>ERROR!</h2>
  <mat-dialog-content>{{ data.message }}</mat-dialog-content>
  <mat-dialog-actions>
      <button mat-raised-button class="bg-gradient-to-r from-blue-900 to-blue-300" mat-dialog-close>OK</button>
  </mat-dialog-actions>
`,
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

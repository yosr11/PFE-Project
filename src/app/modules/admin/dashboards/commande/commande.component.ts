import { Component,Input } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss'],
})
export class CommandeComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
  boitier_phone:number;
 message:string;
  constructor(private snackBar: MatSnackBar,
    private http:HttpClient) { 
    this.snackBarConfig.duration = 1000;
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    
    
  }
 
  toggleColor = 'primary';
  onToggle(checked: boolean, toggleType: string) {
    if (checked) {
      if (toggleType === 'pompe') {
        this.toggleColor = 'accent';
        this.snackBarConfig.panelClass = 'custom-snackbar';
        this.sendSMS('Votre pompe de cale est activée.');
      } else if (toggleType === 'mouillage') {
        this.toggleColor = 'warn';
        this.snackBarConfig.panelClass = 'custom-snackbar';
        this.sendSMS('Le mode mouillage est activé.');
      }
      else if (toggleType === 'security') {
        this.toggleColor = 'warn';
        this.snackBarConfig.panelClass = 'custom-snackbar';
        this.sendSMS('Le mode  sécurité est activé');
      }
      else if (toggleType === 'door') {
        this.toggleColor = 'warn';
        this.snackBarConfig.panelClass = 'custom-snackbar';
        this.sendSMS('votre porte est activé');
      }
    }
  }
  sendSMS(message: string):void {
    const boitier_phone = Number(sessionStorage.getItem('boitier_phone')?.match(/\d+/)[0]);
    console.log(boitier_phone);
    const phoneNumber = `216${boitier_phone}`; 
    //const message = 'veillez vous passer la  commande !'; 
    const data = { phoneNumber, message };
    this.http.post('http://localhost:3000/sms', data).subscribe(
      (response) => {
        console.log(' SMS sent successfully!');
        this.snackBarConfig.panelClass = 'custom-snackbar'; // Appliquer le style personnalisé
        this.snackBar.open('Votre commande est effectuée avec succès', 'Fermer', this.snackBarConfig);
      },
      (error) => {
        console.error('Failed to send SMS:', error);
        this.snackBarConfig.panelClass = 'error-snackbar'; // Appliquer le style personnalisé pour l'erreur
        this.snackBar.open('Erreur lors de l\'envoi de SMS', 'Fermer', this.snackBarConfig);
      }
    );
  }
  
  
}


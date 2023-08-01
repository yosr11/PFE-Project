import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SuccesDialogComponent } from './succes-dialog/succes-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { FormControl } from '@angular/forms';
import { FuseValidators } from '@fuse/validators';
@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    
    signUpForm: FormGroup;
    showAlert: boolean = false;
    showErrorMessage: boolean = false;
  errorMessage: string = '';

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private http:HttpClient,
        private _dialog: MatDialog
    )
    {}
    /**
     * On init
     */
    ngOnInit(): void
    {
      
        // Create the form
        this.signUpForm = this._formBuilder.group({
                nom_particulier       : ['', Validators.required],
                prenom_particulier    : ['',Validators.required],
                email                 : ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[A-Z])/)]],
                confirmPassword       : ['', Validators.required],
                adresse_postale       : ['', Validators.required],
                code_postal           : ['', Validators.required],
                telephone: ['', [Validators.required, this.telephoneValidator]],
                agreements            : [false, [Validators.required, (control: FormControl) => {
                  if (!control.value) {
                      return { required: true };
                  }
                  return null;
              }]]
            },
            {
              validators: FuseValidators.mustMatch('password', 'confirmPassword')
            }
        );
       
    }
    
    telephoneValidator(control: FormControl): { [key: string]: any } | null {
      const value = control.value;
      if (!value) {
        return { required: true };
      }
      // Vérifier si le numéro de téléphone contient exactement 8 ou 9 chiffres et ne contient que des chiffres
      const regex = /^[0-9]{8,9}$/;
      if (!regex.test(value)) {
        return { invalidTelephone: true };
      }
      return null;
    }
    
    onSubmit() {
      if (this.signUpForm.get('agreements').invalid) {
        // Affichez un message d'erreur ou effectuez une action appropriée
        console.log('Veuillez cocher la checkbox');
        const dialogRef = this._dialog.open(ErrorDialogComponent, {
          data: { message: ' Veuillez cocher la checkbox' },
      });
        return;}
        const client = {
          nom_particulier: this.signUpForm.value.nom_particulier,
          prenom_particulier: this.signUpForm.value.prenom_particulier,
          email: this.signUpForm.value.email,
          password: this.signUpForm.value.password,
          confirmPassword: this.signUpForm.value.confirmPassword,
          adresse_postale: this.signUpForm.value.adresse_postale,
          code_postal: this.signUpForm.value.code_postal,
          telephone: this.signUpForm.value.telephone
        };

        // Sign up
        this.http.post<any>('http://localhost:3000/client/inscription', client).subscribe(
          (response: any) => {
      console.log(response);
        // Open the dialog
        const dialogRef = this._dialog.open(SuccesDialogComponent, {
            data: { message: ' Inscription réussite' },
        });
        // Navigate to the sign-in page when the dialog is closed
        dialogRef.afterClosed().subscribe(() => {
            this._router.navigateByUrl('/sign-in');
        });},

          (error: any) => {
    console.error(error);
    //if (error.status === 400 && error.error && error.error.missingFields) {
        
            const dialogRef = this._dialog.open(ErrorDialogComponent, {
                data: { message: 'Échec de l\'inscription. Veuillez accepter les conditions.' },
            });
      
    //}

  });
}
}


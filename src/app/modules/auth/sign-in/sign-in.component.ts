
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { ClientServiceService } from './client-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorConnexionComponent } from './error-connexion/error-connexion.component';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;
   
 

    alert: { type: FuseAlertType; message: string } ;
    signInForm: UntypedFormGroup;
    showAlert = false;
    id_client:number;
    connectedClientId :number;
    nom_particulier:string;
    password:string;
    
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _clientService:ClientServiceService,
        private _dialog:MatDialog
    )
    {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ['', [Validators.required, Validators.email]],
            password  : ['', Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(event:Event): void
    {
        event.preventDefault();
        if (this.signInForm.valid) {
            this._authService.signIn(this.signInForm.value)
              .subscribe(
                (response) => {
                  console.log(response);
                  this._clientService.getConnectedClientId(this.signInForm.value.email, this.signInForm.value.password).subscribe(
                    (id_client) => {
                      sessionStorage.setItem("id_client", JSON.stringify(id_client));
                    },
                  );
                  const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                  // Navigate to the redirect url
                  this._router.navigateByUrl(redirectURL);
                },
                (error) => {
                  const dialogRef = this._dialog.open(ErrorConnexionComponent, {
                    data: { message: 'Email ou mot de passe incorrecte' },
                  });
                }
              );
          }
    }  
}


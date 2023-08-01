import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseValidators } from '@fuse/validators';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AuthResetPasswordComponent implements OnInit {
  @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  resetPasswordForm: FormGroup;
  showAlert: boolean = false;
  id_client: number;

  /**
   * Constructor
   */
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the id_client from the route parameters and store it in the session storage
    this.route.params.subscribe(params => {
      this.id_client = +params.id_client;
      sessionStorage.setItem('id_client', String(this.id_client));
    });

    // Create the form
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[A-Z])/)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: FuseValidators.mustMatch('password', 'confirmPassword')
      }
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset password
   */
  resetPassword(): void {
    // Return if the form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    // Disable the form
    this.resetPasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Get the id_client from the session storage
    const id_client = +sessionStorage.getItem('id_client');

    // Send the request to the server
    this.authService
      .resetPassword(
        this.resetPasswordForm.get('password').value,
        this.resetPasswordForm.get('confirmPassword').value,
        id_client
      )
      .pipe(
        finalize(() => {
          // Re-enable the form
          this.resetPasswordForm.enable();

          // Reset the form
          this.resetPasswordNgForm.resetForm();

          // Show the alert
          this.showAlert = true;
        })
      )
      .subscribe(
        (response) => {
          // Set the alert
          this.alert = {
            type: 'success',
            message: 'Your password has been reset.'
          };
        },
        (error)  => {
            console.log(error);
          // Set the alert
          this.alert = {
            type: 'error',
            message: 'Veuillez entrer un mot de passe valide'
          };
        }
  );
  }
}



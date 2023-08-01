import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ProfilService } from './profil.service';
import { SuccessModificationComponent } from './success-modification/success-modification.component';
import { ErrorModificationComponent } from './error-modification/error-modification.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  @ViewChild('EditNgForm') EditNgForm: NgForm;
  confirmField = { type: 'password' };
  passwordField = { type: 'password' };
  EditForm: FormGroup;
  showAlert: boolean = false;
  Client: any = {};
  telephoneInvalid = false;
  telephone: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private profilService: ProfilService,
    
  ) {
    // Initialize the form with empty values
    this.EditForm = this.fb.group({
      nom_particulier: ['', Validators.required],
      prenom_particulier: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      adresse_postale: [''],
      code_postal: [''],
      telephone: ['']
    });
  }

  ngOnInit(): void {
    // Retrieve the client data and patch the form with the values
    const id_client = Number(sessionStorage.getItem('id_client')?.match(/\d+/)[0]);
    this.profilService.getProfile(id_client).subscribe(
      (client) => {
        console.log('Client data from server:', client);
        this.Client = client[0]; // assign the retrieved client data to the client variable
        this.EditForm.patchValue({
          nom_particulier: this.Client.nom_particulier,
          prenom_particulier: this.Client.prenom_particulier,
          email: this.Client.email,
          password: this.Client.password,
          confirmPassword: this.Client.confirmPassword,
          adresse_postale: this.Client.adresse_postale,
          code_postal: this.Client.code_postal,
          telephone: this.Client.telephone
        });
        console.log('Form after patch:', this.EditForm);
      },
      (error) => {
        console.error('Error while retrieving client data:', error);
      }
    );
  }

  editProfile() {
    const id_client = Number(sessionStorage.getItem('id_client')?.match(/\d+/)[0]);
    const client = {
      nom_particulier: this.EditForm.value.nom_particulier,
      prenom_particulier: this.EditForm.value.prenom_particulier,
      email: this.EditForm.value.email,
      password: this.EditForm.value.password,
      confirmPassword: this.EditForm.value.confirmPassword,
      adresse_postale: this.EditForm.value.adresse_postale,
      code_postal: this.EditForm.value.code_postal,
      telephone: this.EditForm.value.telephone
    };

    this.profilService.editProfile(id_client, client).subscribe(
      res => {
        // Handle success response
        console.log(res);
        const dialogRef = this.dialog.open(SuccessModificationComponent, {
          data: { message: 'Modification réussie' },
        });
      },
      error => {
        // Handle error response
        
        const dialogRef = this.dialog.open(ErrorModificationComponent, {
          data: { message: 'Erreur lors de la modification' },
        });
      }
    );
    
  };
  

  getErrorMessage() { }

}

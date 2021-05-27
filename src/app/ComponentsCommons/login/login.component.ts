import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { login } from 'src/app/shared/Collaborateur/query';
import { Collaborateur } from './../../Models/collaborateur';
import { AlertService } from './../../Services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private nomUtilisateur: string;
  private motDePasse: string;
  public token: string;
  public user: Collaborateur;
  submitted = false;
  loading = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private apollo: Apollo, private formBuilder: FormBuilder, private http: HttpClient,
              private router: Router,
              private auth: AuthService,
              private toastr: ToastrService,
              private alertService: AlertService
  ) {
    if (this.auth.isLoggednIn()) {
      this.isLoggedIn=true;
      this.isLoginFailed = false;
      this.router.navigate(['accueil']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nomUtilisateur: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted=true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid ) {
      this.toastr.error('Nom utilisateur ou mot de passe invalide!');
      return;
    }
    this.loading=true;
    this.nomUtilisateur = this.f.nomUtilisateur.value;
    this.motDePasse = this.f.motDePasse.value;
    console.log(this.nomUtilisateur);
    this.apollo.mutate({
      mutation: login,
      // variables: {nomUtilisateur: this.loginForm.value.nomUtilisateur, motDePasse: this.loginForm.value.motDePasse}
      variables: {nomUtilisateur: this.f.nomUtilisateur.value, motDePasse: this.f.motDePasse.value}

    })
    .subscribe(({data}: any) => {
      console.log(data);
        this.token = data.login.access_token;
        this.user = data.login.user;
        // this.user.role = data.login.user.role;
        this.auth.sendToken(data.login.access_token);
        // this.auth.sendRole(data.login.user.role);
        this.auth.sendUser(this.user);
        this.isLoggedIn=true;
        this.isLoginFailed = false;
        console.log("userAuth:",this.user,"token:",this.token);
        this.toastr.success('Connexion approuvée');
        this.router.navigate(['accueil']);
    },
    err => {
      this.toastr.error('Nom utilisateur ou mot de passe invalide!');
      this.alertService.error(err);
      this.loading = false;
      this.isLoginFailed = true;
    }
    );
  }

  logout() {
    this.auth.logout();
  }


}

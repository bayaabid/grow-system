import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { Credentials } from '@app/shared/models/credentials.model';
import { AuthenticationService } from '@core/services/authentication.service';

@Component({
  selector: 'grow-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm')
  loginForm: LoginFormComponent

  public form: FormGroup;

  constructor(
    private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(user: any) {
    this._authenticationService.login();
  }

  onSubmit(user: any) {
    this.loginForm.form.reset();
    this._authenticationService.login();
  }

}

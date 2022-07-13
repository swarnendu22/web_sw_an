import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { RequestModel } from 'src/app/utils/request/request.model';
import { RequestService } from 'src/app/utils/request/request.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/_authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  returnUrl: string;


  LoginForm = this._formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    isRemember: [null],
  });

  private readonly requestData = {
    method: 'post',
    url: '/api/signin',
    payload: '',
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _api: RequestService,
    private _router: Router,
    private _auth: AuthenticationService,
    private activatedroute: ActivatedRoute,
  ) {

  }

  ngOnInit() { }

  login() {
    const request: RequestModel = Object.assign(this.requestData, {
      payload: this.LoginForm.value,
    });
    this._auth.login(request);

    // this._api.request(request).subscribe(
    //   res => {
    //     this.LoginForm.reset();
    //     localStorage.setItem('ndh-admin-auth-token', res['accessToken']);
    //     this._router.navigate(['dashboard']);
    //   },
    //   err => this._api.handleError(err)
    // );
  }
}

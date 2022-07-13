import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  ValidatorFn,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { RequestService } from 'src/app/utils/request/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../auth-layout/services/_authentication.service';
import { RequestModel } from 'src/app/utils/request/request.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  showPass = false;
  resetForm = this._formBuilder.group(
    {
      existing_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    },
    {
      validator: this.mustMatch('new_password', 'confirm_password'),
    }
  );

  constructor(
    private _formBuilder: FormBuilder,
    private _api: RequestService,
    private _router: Router,
    private _auth: AuthenticationService,
    private activatedroute: ActivatedRoute,
    private toastr: ToastrService
  ) { }
  oldPassHide = true;
  newPassHide = true;
  confirmPassHide = true;


  ngOnInit() {
  }

  onPaste(event) {
    console.log(event.target.value.includes("-"));
    event.value = "";
  }

  resetPassword() {
    console.log('Submit', this.resetForm.value);

    const payload = {
      method: 'post',
      url: '/api/user/admin-api/updatepass',
      payload: {
        existingPassword: this.resetForm.get('existing_password').value,
        updatePassword: this.resetForm.get('new_password').value,
      },
    };

    this._resetPassword(payload);

    // this.resetForm.reset();
  }

  get f() {
    return this.resetForm.controls;
  }

  checkExisting(e) {
    console.log('e', this.resetForm.get('new_password').value);
    const oldPassword = this.resetForm.get('existing_password').value;
    const newPass = this.resetForm.get('new_password').value;
    if (oldPassword == newPass) {
      this.resetForm.get('new_password').setErrors({ notUnique: true });
    }
  }

  // Validation for confirm password
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  _resetPassword(request: RequestModel) {
    return this._api.request(request, true).subscribe(
      res => {
        console.log('Res', res);
        this._auth.logout();
        this._router.navigate(['/auth/login']);
      },
      err => {
        this._api.handleError(err, 500, false);
      }
    );
  }

  showPassword() {
    this.showPass = !this.showPass;
  }
}

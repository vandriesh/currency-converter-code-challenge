import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserCredentials } from '../auth/auth.service';

@Component({
  selector: 'app-login-form',
  styleUrls: ['./login-form.component.scss'],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  @Output() login: EventEmitter<UserCredentials> = new EventEmitter();
  loginForm = this.fb.group({
    password: [null, Validators.required],
    username: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    const loginForm = this.loginForm;

    if (this.validForm()) {
      const userName = loginForm.controls['username'].value;
      const password = loginForm.controls['password'].value;
      this.login.emit({ userName, password });
    }
  }

  validForm() {
    const userNameControl = this.loginForm.controls['username'];
    const userPasswordControl = this.loginForm.controls['password'];
    return (
      userNameControl.valid &&
      userNameControl.value !== '' &&
      userPasswordControl.valid &&
      userPasswordControl.value !== ''
    );
  }
}

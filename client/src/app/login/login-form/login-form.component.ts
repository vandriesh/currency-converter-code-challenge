import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  styleUrls: ['./login-form.component.scss'],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    password: [null, Validators.required],
    username: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
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

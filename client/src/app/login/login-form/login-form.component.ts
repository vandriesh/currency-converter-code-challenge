import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
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

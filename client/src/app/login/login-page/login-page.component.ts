import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService, UserCredentials } from '../auth/auth.service';

@Component({
  selector: 'app-login-page',
  styleUrls: ['./login-page.component.scss'],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onLogin(userCredentials: UserCredentials) {
    if (!this.authService.authorised(userCredentials)) {
      this.snackBar.open('Invalid username or password', 'Ok', {
        duration: 2000
      });

      return;
    }

    this.authService.login(userCredentials);

    if (this.authService.redirectUrl) {
      this.router.navigateByUrl(this.authService.redirectUrl);
    } else {
      this.router.navigate(['']);
    }
  }
}

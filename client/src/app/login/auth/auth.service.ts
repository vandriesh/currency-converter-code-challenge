import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { LocalStorageService } from '../../storage/local-storage.service';

import { LoggedUser, User } from './user';

const userDB: User[] = [
  {userName: 'user1', password: 'pass1', fullName: 'John Doe'},
  {userName: 'user2', password: 'pass2', fullName: 'Adam Smith'}
];

export interface UserCredentials {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: LoggedUser;
  logged$ = new Subject<boolean>();
  redirectUrl: string;

  constructor(private storage: LocalStorageService, private router: Router) {
    const savedUser = this.storage.get('CURRENT_USER');

    if (savedUser) {
      this.currentUser = savedUser;
      this.logged$.next(true);
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login({userName, password}: UserCredentials): void {
    if (!userName || !password) {
      return;
    }

    this.currentUser = {userName};
    this.storage.save('CURRENT_USER', this.currentUser);
    this.logged$.next(true);
  }

  logout(): void {
    this.currentUser = null;
    this.storage.save('CURRENT_USER', null);
    this.logged$.next(false);
    this.router.navigate(['/login']);
  }

  authorised({userName, password}: UserCredentials) {
    const userIndex = userDB.findIndex(entry => entry.userName === userName);

    if (userIndex === -1) {
      return false;
    }

    return userDB[userIndex].password === password;
  }
}

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../login/auth/auth.service';

@Component({
  selector: 'app-pq-navigation',
  styleUrls: ['./pq-navigation.component.scss'],
  templateUrl: './pq-navigation.component.html'
})
export class PqNavigationComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  public menu = [
    {
      label: 'CURRENCY CONVERTER',
      path: 'converter'
    },
    {
      label: 'VIEW CONVERSION HISTORY',
      path: 'history'
    }
  ];

  logged = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {

    this.logged = this.authService.isLoggedIn();

    this.subscription = this.authService.logged$.subscribe(logged => {
      this.logged = logged;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}

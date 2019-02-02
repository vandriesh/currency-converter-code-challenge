import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pq-navigation',
  styleUrls: ['./pq-navigation.component.scss'],
  templateUrl: './pq-navigation.component.html'
})
export class PqNavigationComponent {
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

  constructor(private breakpointObserver: BreakpointObserver) {}
}

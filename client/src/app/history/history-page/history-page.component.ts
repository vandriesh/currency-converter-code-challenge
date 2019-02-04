import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-page',
  styleUrls: ['./history-page.component.scss'],
  templateUrl: './history-page.component.html'
})
export class HistoryPageComponent implements OnInit {
  displayedColumns = ['Date', 'Event', 'Actions'];

  dataSource = [];
  currencies = ['USD', 'EUR', 'GBP'];

  constructor() {
    for (let i = 0; i < 20; i++) {
      const from = this.currencies[i % 3];
      const to = this.currencies[(i + 1) % 3];
      this.dataSource.push({
        Date: Date.now(),
        Event: `${from} to ${to}`
      });
    }

  }

  ngOnInit() {}
}

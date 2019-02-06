import { Component, OnInit } from '@angular/core';

import { CurrencyOperation } from '../../features/currencies/currencies.service';
import { LocalStorageService } from '../../storage/local-storage.service';

@Component({
  selector: 'app-history-page',
  styleUrls: ['./history-page.component.scss'],
  templateUrl: './history-page.component.html'
})
export class HistoryPageComponent implements OnInit {
  dataSource: CurrencyOperation[] = [];

  constructor(private storage: LocalStorageService) {
    this.dataSource = storage.get('CURRENCY_OPERATIONS');
  }

  ngOnInit() {}

  deleteHandler(id: string) {
    const updatedList = this.dataSource.filter(item => item.id !== id);

    this.dataSource = updatedList;

    this.storage.save('CURRENCY_OPERATIONS', updatedList);
  }
}

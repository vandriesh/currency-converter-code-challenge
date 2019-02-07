import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CurrenciesService,
  Currency,
  CurrencyRate
} from '../../features/currencies/currencies.service';

const ONE_WEEK = 7;
const TWO_WEEKS = 14;
const ONE_MONTH = 30;

@Component({
  selector: 'app-exchange-history',
  styleUrls: ['./exchange-history.component.scss'],
  templateUrl: './exchange-history.component.html'
})
export class ExchangeHistoryComponent implements OnChanges {
  @Input() currency: Currency;
  timeFrames = [ONE_WEEK, TWO_WEEKS, ONE_MONTH];
  dayLength = this.timeFrames[0];
  rates$: Observable<CurrencyRate[]>;

  constructor(private currencyService: CurrenciesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentCurrency: SimpleChange = changes.currency;

    if (currentCurrency.currentValue && currentCurrency.currentValue.currency) {
      this.fetchRatesFor();
    }
  }

  fetchRatesFor() {
    this.rates$ = this.currencyService.getExchangeRatesFor(this.dayLength, this.currency);
  }
}

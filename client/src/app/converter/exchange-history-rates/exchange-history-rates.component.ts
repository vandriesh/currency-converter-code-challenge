import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

import { CurrencyRate } from '../../features/currencies/currencies.service';

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

@Component({
  selector: 'app-exchange-history-rates',
  styleUrls: ['./exchange-history-rates.component.scss'],
  templateUrl: './exchange-history-rates.component.html'
})
export class ExchangeHistoryRatesComponent implements OnChanges {
  @Input() rates: CurrencyRate[];
  ratesColumns: string[] = ['timestamp', 'rate'];
  statistics: any[];
  statisticsColumns: string[] = ['label', 'rate'];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentRates: SimpleChange = changes.rates;

    if (currentRates.currentValue && currentRates.currentValue.length) {
      this.buildStatistics(currentRates.currentValue);
    }
  }

  private buildStatistics(rates: CurrencyRate[]) {
    const rateValues = rates.map(rate => Number.parseFloat(rate.rate));
    const minRate = getMinOfArray(rateValues);
    const maxRate = getMaxOfArray(rateValues);
    const averageRate = (minRate + maxRate) / 2;

    this.statistics = [
      {
        label: 'Lowest',
        rate: minRate
      },
      {
        label: 'Highest',
        rate: maxRate
      },
      {
        label: 'Average',
        rate: averageRate
      }
    ];
  }
}

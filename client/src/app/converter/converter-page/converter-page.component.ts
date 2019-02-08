import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import {
  CurrenciesService,
  Currency, CurrencyOperation
} from '../../features/currencies/currencies.service';
import { LocalStorageService } from '../../storage/local-storage.service';
import { OperationData } from '../converter-form/converter-form.component';

@Component({
  selector: 'app-converter-page',
  styleUrls: ['./converter-page.component.scss'],
  templateUrl: './converter-page.component.html'
})
export class ConverterPageComponent implements OnInit {
  currencies = [];
  currencyRates$: Observable<Currency[]>;
  toCurrency: Currency = null;
  private existingOperation$: Observable<CurrencyOperation>;

  constructor(
    private fb: FormBuilder,
    private currenciesService: CurrenciesService,
    private activatedRouter: ActivatedRoute,
    private storage: LocalStorageService
  ) {
    this.activatedRouter.params.subscribe(params => {
      const currencyOperations = this.storage.get('CURRENCY_OPERATIONS');
      const op = currencyOperations.filter(op => op.id === params.id);

      if (op && op[0]) {
        this.existingOperation$ = of(op[0]);
      }
    });
  }

  ngOnInit() {
    const currenciesStoredLocally = this.storage.get('CURRENCIES');

    if (currenciesStoredLocally) {
      this.currencyRates$ = of(currenciesStoredLocally);
    } else {
      this.currencyRates$ = this.currenciesService.getExchangeRates();
    }
  }

  onSubmit({ amount, to, from }: OperationData) {
    this.storage.addOperation({ amount, from, to });
  }

  updateExchangeHistory(currency: Currency) {
    this.toCurrency = currency;
  }
}

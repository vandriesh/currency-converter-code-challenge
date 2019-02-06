import { Injectable } from '@angular/core';

import {
  Currency,
  CurrencyOperation
} from '../features/currencies/currencies.service';

const STORAGE_KEY = 'pq_settings';

interface AppSettings {
  CURRENCY_OPERATIONS: CurrencyOperation[];
  CURRENCIES: Currency[];
}

const defaultSettings = {} as AppSettings;

export type SETTINGS_KEYS = keyof AppSettings;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly APP_SETTINGS: AppSettings;

  constructor() {
    if (window.localStorage) {
      this.APP_SETTINGS = Object.assign(
        defaultSettings,
        JSON.parse(localStorage.getItem(STORAGE_KEY))
      );
    } else {
      this.APP_SETTINGS = defaultSettings;
    }
  }

  public save(key: SETTINGS_KEYS, value: any): void {
    this.APP_SETTINGS[key] = value;

    if (window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.APP_SETTINGS));
    }
  }

  public get(key: SETTINGS_KEYS): any {
    let data: any = this.APP_SETTINGS[key];

    if (key === 'CURRENCY_OPERATIONS' && !data) {
      data = this.generateOps();
      this.save(key, data);
    }

    return data;
  }

  addOperation(params: Partial<CurrencyOperation>) {
    const op = {
      ...params,
      id: guid(),
      timestamp: Date.now()
    };

    const ops = this.get('CURRENCY_OPERATIONS');

    ops.unshift(op);

    this.save('CURRENCY_OPERATIONS', ops);
  }

  private generateOps(): CurrencyOperation[] {
    const currencies = [
      { currency: 'USD', rate: '1' } as Currency,
      { currency: 'EUR', rate: '0.8' } as Currency,
      { currency: 'GBP', rate: '0.8' } as Currency
    ];
    const dataSource: CurrencyOperation[] = [];

    for (let i = 0; i < 5; i++) {
      const from = currencies[i % 3];
      const to = currencies[(i + 1) % 3];
      const amount = '' + Math.round(Math.random() * 10) * 100;
      const timestamp = Date.now();
      const id = guid();

      dataSource.push({
        amount,
        from,
        id,
        timestamp,
        to
      });
    }

    return dataSource;
  }
}

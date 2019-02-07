import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const { NOMICS_API_KEY } = environment;

export interface Currency {
  currency: string;
  rate: string;
  timestamp: string;
}

export interface CurrencyRate {
  rate: string;
  timestamp: string;
}

function ISODateString(d) {
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  return (
    d.getUTCFullYear() +
    '-' +
    pad(d.getUTCMonth() + 1) +
    '-' +
    pad(d.getUTCDate()) +
    'T00:00:00Z'
  );
}

export interface CurrencyOperation {
  id: string;
  amount: string;
  from: Currency;
  to: Currency;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  public static nomicsUrl = 'https://api.nomics.com/v1';

  constructor(private httpClient: HttpClient) {}

  static getRate(from: Currency, to: Currency): number {
    const fromRate = parseFloat(from.rate);
    const toRate = parseFloat(to.rate);

    return fromRate / toRate;
  }

  getExchangeRates(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(
      `${CurrenciesService.nomicsUrl}/exchange-rates?key=${NOMICS_API_KEY}`
    );
  }

  getExchangeRatesFor(
    days: number = 7,
    currency: Currency
  ): Observable<CurrencyRate[]> {
    const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * MILLISECONDS_IN_DAY);

    const startDateEncoded = encodeURIComponent(ISODateString(startDate));
    const endDateEncoded = encodeURIComponent(ISODateString(endDate));

    return this.httpClient.get<CurrencyRate[]>(
      `${
        CurrenciesService.nomicsUrl
      }/exchange-rates/history?key=${NOMICS_API_KEY}&currency=${
        currency.currency
      }&start=${startDateEncoded}&end=${endDateEncoded}`
    );
  }
}

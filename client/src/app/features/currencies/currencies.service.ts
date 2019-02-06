import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

const { NOMICS_API_KEY } = environment;

export interface Currency {
  currency: string;
  rate: string;
  timestamp: string;
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
}

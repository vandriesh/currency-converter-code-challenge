import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const NOMICS_API_KEY = ''

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private nomicsUrl = 'https://api.nomics.com/v1';

  constructor(private httpClient: HttpClient) { }

  getExchangeRates () {
    return this.httpClient.get(`${this.nomicsUrl}/exchange-rates?key=${NOMICS_API_KEY}`)
  }
}

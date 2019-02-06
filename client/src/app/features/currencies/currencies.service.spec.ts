import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import 'jasmine-expect';

import { CurrenciesService, Currency } from './currencies.service';

export const EUR_CURRENCY = { currency: 'EUR', rate: '1.5', timestamp: '2019-02-05T00:00:00Z' };
export const GBP_CURRENCY = { currency: 'GBP', rate: '2', timestamp: '2019-02-05T00:00:00Z' };
export const CAD_CURRENCY = { currency: 'CAD', rate: '0.5', timestamp: '2019-02-05T00:00:00Z' };
export const CHF_CURRENCY = { currency: 'CHF', rate: '1.0', timestamp: '2019-02-05T00:00:00Z' };
export const USD_CURRENCY = { currency: 'CHF', rate: '1.0000', timestamp: '2019-02-05T00:00:00Z' };


function getMockRates(): Currency[] {
  return [
    EUR_CURRENCY,
    GBP_CURRENCY,
    CAD_CURRENCY,
    CHF_CURRENCY,
    USD_CURRENCY
  ];
}

describe('CurrenciesService', () => {
  let injector: TestBed;
  let service: CurrenciesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrenciesService]
    });

    injector = getTestBed();
    service = injector.get(CurrenciesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(CurrenciesService.getRate).toBeFunction();
  });

  it('should return some currency exchange rates', () => {
    const dummyResult = getMockRates();

    service
      .getExchangeRates()
      .subscribe((result: Currency[]) => expect(result).toEqual(dummyResult));

    const mockRequest = httpMock.expectOne((req: HttpRequest<Currency[]>) => {
      return (
        req.url.indexOf(
          `${CurrenciesService.nomicsUrl}/exchange-rates?key=`
        ) === 0
      );
    });
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(dummyResult);
  });
});

import { getRate } from './convert-util';
import {
  CAD_CURRENCY,
  CHF_CURRENCY,
  EUR_CURRENCY,
  GBP_CURRENCY,
  USD_CURRENCY
} from './currencies.service.spec';

describe('Convert Util', () => {
  it('should be accessible', function() {
    expect(getRate).toBeDefined();
  });

  it('should convert from USD to EUR and back', function() {
    const ONE_EUR_TO_USD = getRate(EUR_CURRENCY, USD_CURRENCY);
    const ONE_USD_TO_EUR = getRate(USD_CURRENCY, EUR_CURRENCY);

    expect(ONE_EUR_TO_USD).toEqual(parseFloat(EUR_CURRENCY.rate));
    expect(ONE_USD_TO_EUR).toEqual(1 / parseFloat(EUR_CURRENCY.rate));
  });

  it('should convert from GBP to EUR and back', function() {
    const ONE_GBP_TO_EUR = getRate(GBP_CURRENCY, EUR_CURRENCY);
    const ONE_EUR_TO_GBP = getRate(EUR_CURRENCY, GBP_CURRENCY);

    expect(ONE_GBP_TO_EUR).toEqual(2 / 1.5);
    expect(ONE_EUR_TO_GBP).toEqual(1.5 / 2);
  });

  it('should convert from CAD to CHF and back', function() {
    const ONE_CAD_TO_CHF = getRate(CAD_CURRENCY, CHF_CURRENCY);
    const ONE_CHF_TO_CAD = getRate(CHF_CURRENCY, CAD_CURRENCY);

    expect(ONE_CAD_TO_CHF).toEqual(0.5 / 1);
    expect(ONE_CHF_TO_CAD).toEqual(1 / 0.5);
  });
});

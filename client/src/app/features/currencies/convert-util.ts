import { Currency } from './currencies.service';

export function getRate(from: Currency, to: Currency): number {
   const fromRate = parseFloat(from.rate);
  const toRate = parseFloat(to.rate);

  return fromRate / toRate;
}

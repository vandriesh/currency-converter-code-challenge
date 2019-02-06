import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  CurrenciesService,
  Currency
} from '../../features/currencies/currencies.service';

type FieldControl = 'fromField' | 'toField';
type NullCurrency = Currency | null;

const notEmptyAndValid = (control: AbstractControl) =>
  control.value !== '' && control.valid;

@Component({
  selector: 'app-converter-page',
  styleUrls: ['./converter-page.component.scss'],
  templateUrl: './converter-page.component.html'
})
export class ConverterPageComponent implements OnInit {
  convertForm: FormGroup = null;
  currencies = [];
  currencyRates: {
    [key: string]: Currency;
  } = {};

  constructor(
    private fb: FormBuilder,
    private currenciesService: CurrenciesService
  ) {}

  ngOnInit() {
    this.currenciesService
      .getExchangeRates()
      .subscribe((currencyRates: Currency[]) => {
        currencyRates.forEach((item: Currency) => {
          this.currencyRates[item.currency] = item;
          this.currencies.push(item.currency);
        });

        this.convertForm = this.fb.group({
          amount: ['100', Validators.required],
          fromField: ['USD', Validators.required],
          toField: ['EUR', Validators.required]
        });
      });
  }

  validForm() {
    return (
      notEmptyAndValid(this.convertForm.controls['amount']) &&
      notEmptyAndValid(this.convertForm.controls['fromField']) &&
      notEmptyAndValid(this.convertForm.controls['toField'])
    );
  }

  onSubmit() {
    console.log('amount:', this.convertForm.controls['amount'].value);
    console.log('from:', this.convertForm.controls['fromField'].value);
    console.log('to :', this.convertForm.controls['toField'].value);
  }

  convertedAmount() {
    const fromCurrency: NullCurrency = this.getCurrency('fromField');
    const toCurrency: NullCurrency = this.getCurrency('toField');

    if (this.validForm() && fromCurrency !== null && toCurrency !== null) {
      return this.round(
        CurrenciesService.getRate(fromCurrency, toCurrency) *
          parseInt(this.convertForm.controls['amount'].value, 10),
        3
      );
    }

    return '?';
  }

  get(controlName: string) {
    const val = this.getVal(controlName);

    return val !== null ? val : '?';
  }

  set(amount: string, value) {
    if (value !== '?') {
      return this.convertForm.controls[amount].setValue(value);
    }
  }

  swapCurrencies() {
    const from = this.get('fromField');
    const to = this.get('toField');

    this.set('fromField', to);
    this.set('toField', from);
  }

  displayFromRate(
    leftControlName: FieldControl,
    rightControlName: FieldControl
  ): string {
    const leftCurrency: NullCurrency = this.getCurrency(leftControlName);
    const rightCurrency: NullCurrency = this.getCurrency(rightControlName);

    if (leftCurrency === null || rightCurrency === null) {
      return '';
    }

    const rate = this.round(
      CurrenciesService.getRate(leftCurrency, rightCurrency),
      6
    );

    return `1 ${leftCurrency.currency} = ${rate} ${rightCurrency.currency}`;
  }

  private getCurrency(controllerName): NullCurrency {
    const currencyName = this.getVal(controllerName);

    return this.currencyRates[currencyName] || null;
  }

  private getVal(controlName: string) {
    if (notEmptyAndValid(this.convertForm.controls[controlName])) {
      return this.convertForm.controls[controlName].value;
    }

    return null;
  }

  private round(num: number, digitCount: number) {
    return Number(num).toFixed(digitCount);
  }
}

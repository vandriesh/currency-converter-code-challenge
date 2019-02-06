import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {
  CurrenciesService,
  Currency
} from '../../features/currencies/currencies.service';
import { LocalStorageService } from '../../storage/local-storage.service';

type FieldControl = 'fromField' | 'toField';
type NullCurrency = Currency | null;

const notEmptyAndValid = (control: AbstractControl) =>
  control.value !== '' && control.valid;

export function notEmptyNumber(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const { value } = control;
    const empty = value === '';

    const number = !isNaN(value);

    if (empty || number) {
      return null;
    }

    return { notEmptyNumber: { value } };
  };
}

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

  filteredOptionsFrom: Observable<string[]>;
  filteredOptionsTo: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private currenciesService: CurrenciesService,
    private storage: LocalStorageService
  ) {}

  ngOnInit() {
    const currenciesStoredLocally = this.storage.get('CURRENCIES');

    if (currenciesStoredLocally) {
      this.initForm(currenciesStoredLocally);
    } else {
      this.currenciesService
        .getExchangeRates()
        .subscribe((currencyRates: Currency[]) => {
          this.initForm(currencyRates);
        });
    }

    this.convertForm = this.fb.group({
      amount: ['100', [Validators.required, notEmptyNumber()]],
      fromField: [{ value: 'USD', disabled: true }, Validators.required],
      toField: [{ value: 'EUR', disabled: true }, Validators.required]
    });

    this.filteredOptionsFrom = this.convertForm.controls[
      'fromField'
    ].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptionsTo = this.convertForm.controls[
      'toField'
    ].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  validForm() {
    return (
      notEmptyAndValid(this.convertForm.controls['amount']) &&
      notEmptyAndValid(this.convertForm.controls['fromField']) &&
      notEmptyAndValid(this.convertForm.controls['toField'])
    );
  }

  onSubmit() {
    const amount = this.getVal('amount');
    const from = this.getCurrency('fromField');
    const to = this.getCurrency('toField');

    this.storage.addOperation({ amount, from, to });
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.currencies.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private getCurrency(controllerName): NullCurrency {
    const currencyName = this.getVal(controllerName);

    return this.currencyRates[currencyName] || null;
  }

  private getVal(controlName: string): string {
    if (notEmptyAndValid(this.convertForm.controls[controlName])) {
      return this.convertForm.controls[controlName].value;
    }

    return '';
  }

  private round(num: number, digitCount: number) {
    return Number(num).toFixed(digitCount);
  }

  private initForm(currencyRates: Currency[]) {
    currencyRates.forEach((item: Currency) => {
      this.currencyRates[item.currency] = item;
      this.currencies.push(item.currency);
    });

    this.convertForm.get('fromField').enable();
    this.convertForm.get('toField').enable();
  }
}

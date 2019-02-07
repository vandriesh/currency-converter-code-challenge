import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
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

const notEmptyAndValid = (control: AbstractControl) =>
  control.value !== '' && control.valid;

export interface OperationData {
  amount: string;
  from: Currency;
  to: Currency;
}

type FieldControl = 'fromField' | 'toField';
type NullCurrency = Currency | null;

export function validCurrencyName(currencies): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const { value } = control;

    if (value === '') {
      return null;
    }

    if (!currencies[value]) {
      return { validCurrencyName: { value } };
    }

    return null;
  };
}

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
  selector: 'app-converter-form',
  styleUrls: ['./converter-form.component.scss'],
  templateUrl: './converter-form.component.html'
})
export class ConverterFormComponent implements OnInit, OnChanges {
  @Input() rates: Currency[] = [];
  @Output() toFieldChange: EventEmitter<Currency> = new EventEmitter<
    Currency
  >();
  @Output() submitEvent: EventEmitter<OperationData> = new EventEmitter<
    OperationData
  >();

  convertForm: FormGroup = null;
  defaultToFieldValue: Currency = null;
  filteredOptionsFrom: Observable<string[]>;
  filteredOptionsTo: Observable<string[]>;
  currencies: string[] = [];
  currencyRates: {
    [key: string]: Currency;
  } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.defaultToFieldValue = { currency: 'EUR' } as Currency;

    this.convertForm = this.fb.group({
      amount: ['100', [Validators.required, notEmptyNumber()]],
      fromField: [{ value: 'USD', disabled: true }],
      toField: [{ value: this.defaultToFieldValue.currency, disabled: true }]
    });
  }

  emitFormData() {
    const amount = this.getVal('amount');
    const from = this.getCurrency('fromField');
    const to = this.getCurrency('toField');

    this.submitEvent.emit({ amount, from, to });
  }

  swapCurrencies() {
    const from = this.get('fromField');
    const to = this.get('toField');

    this.set('fromField', to);
    this.set('toField', from);

    if (this.getVal('toField')) {
      this.emitToFieldSelected(this.getVal('toField'));
    }
  }

  get(controlName: string) {
    const val = this.getVal(controlName);

    return val || '?';
  }

  set(amount: string, value) {
    if (value !== '?') {
      return this.convertForm.controls[amount].setValue(value);
    }
  }

  validForm() {
    return (
      notEmptyAndValid(this.convertForm.controls['amount']) &&
      notEmptyAndValid(this.convertForm.controls['fromField']) &&
      notEmptyAndValid(this.convertForm.controls['toField'])
    );
  }

  convertedAmount() {
    const fromCurrency: NullCurrency = this.getCurrency('fromField');
    const toCurrency: NullCurrency = this.getCurrency('toField');

    if (this.validForm() && fromCurrency !== null && toCurrency !== null) {
      return this.round(
        CurrenciesService.getRate(fromCurrency, toCurrency) *
        parseInt(this.convertForm.controls['amount'].value, 10)
      , 3);
    }

    return '?';
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

  ngOnChanges(changes: SimpleChanges): void {
    const rates: SimpleChange = changes.rates;

    if (rates.currentValue && rates.currentValue.length) {
      this.initForm();
    }
  }

  emitToFieldSelected(value: any) {
    this.toFieldChange.emit(this.currencyRates[value]);
  }

  private getVal(controlName: string): string {
    if (notEmptyAndValid(this.convertForm.controls[controlName])) {
      return this.convertForm.controls[controlName].value;
    }

    return '';
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

  private round(num: number, digitCount: number) {
    return Number(num).toFixed(digitCount);
  }

  private initForm() {
    if (this.rates) {
      this.rates.forEach((item: Currency) => {
        this.currencyRates[item.currency] = item;
        this.currencies.push(item.currency);
      });
    }

    this.emitToFieldSelected(this.defaultToFieldValue.currency);

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

    const currencyValidator = validCurrencyName(this.currencyRates);

    this.convertForm.get('fromField').enable();
    this.convertForm
      .get('fromField')
      .setValidators([currencyValidator, Validators.required]);

    this.convertForm.get('toField').enable();
    this.convertForm
      .get('toField')
      .setValidators([currencyValidator, Validators.required]);
  }
}

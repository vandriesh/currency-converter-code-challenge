import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

const notEmptyAndValid = (control: AbstractControl) =>
  control.value !== '' && control.valid;

@Component({
  selector: 'app-converter-page',
  styleUrls: ['./converter-page.component.scss'],
  templateUrl: './converter-page.component.html'
})
export class ConverterPageComponent implements OnInit {
  convertForm = this.fb.group({
    amount: ['500', Validators.required],
    fromField: ['EUR', Validators.required],
    toField: ['USD', Validators.required]
  });

  currencies = ['USD', 'EUR'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

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
    if (this.validForm()) {
      return '576.168';
    }

    return '?';
  }

  convert(amount, coefficient) {
    if (this.validForm()) {
      return amount * coefficient;
    }

    return '';
  }

  get(amount: string) {
    if (notEmptyAndValid(this.convertForm.controls[amount])) {
      return this.convertForm.controls[amount].value;
    }

    return '?';
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
}

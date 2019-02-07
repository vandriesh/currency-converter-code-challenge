import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CurrenciesService } from '../../features/currencies/currencies.service';
import { FeaturesModule } from '../../features/features.module';
import { MdmModule } from '../../mdm/mdm.module';
import { ExchangeHistoryRatesComponent } from '../exchange-history-rates/exchange-history-rates.component';
import { ExchangeHistoryComponent } from '../exchange-history/exchange-history.component';

import {
  ConverterPageComponent,
  notEmptyNumber
} from './converter-page.component';

describe('ConverterPageComponent', () => {
  let component: ConverterPageComponent;
  let fixture: ComponentFixture<ConverterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConverterPageComponent,
        ExchangeHistoryComponent,
        ExchangeHistoryRatesComponent
      ],
      imports: [ReactiveFormsModule, MdmModule, FeaturesModule],
      providers: [CurrenciesService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('From validation', () => {
    let control, notEmptyNumberValidator;

    beforeEach(() => {
      control = new FormControl('input');
      notEmptyNumberValidator = notEmptyNumber();
    });

    it('should return null is string is empty', () => {
      control.setValue('');
      expect(notEmptyNumberValidator(control)).toBeNull();
    });

    it('should return null is string is number', () => {
      control.setValue('123');
      expect(notEmptyNumberValidator(control)).toBeNull();
    });

    it('should return error is string is invalid number or string', () => {
      control.setValue('123a');
      expect(notEmptyNumberValidator(control)).toEqual({
        notEmptyNumber: {
          value: '123a'
        }
      });

      control.setValue('aba');
      expect(notEmptyNumberValidator(control)).toEqual({
        notEmptyNumber: {
          value: 'aba'
        }
      });
    });
  });
});

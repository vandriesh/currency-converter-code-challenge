import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CurrenciesService } from '../../features/currencies/currencies.service';
import { MdmModule } from '../../mdm/mdm.module';

import {
  ConverterFormComponent,
  notEmptyNumber
} from './converter-form.component';

describe('ConverterFormComponent', () => {
  let component: ConverterFormComponent;
  let fixture: ComponentFixture<ConverterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterFormComponent],
      imports: [ReactiveFormsModule, MdmModule],
      providers: [CurrenciesService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterFormComponent);
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CurrenciesService } from '../../features/currencies/currencies.service';
import { FeaturesModule } from '../../features/features.module';
import { MdmModule } from '../../mdm/mdm.module';
import { ConverterFormComponent } from '../converter-form/converter-form.component';
import { ExchangeHistoryRatesComponent } from '../exchange-history-rates/exchange-history-rates.component';
import { ExchangeHistoryComponent } from '../exchange-history/exchange-history.component';

import { ConverterPageComponent } from './converter-page.component';

describe('ConverterPageComponent', () => {
  let component: ConverterPageComponent;
  let fixture: ComponentFixture<ConverterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConverterPageComponent,
        ExchangeHistoryComponent,
        ExchangeHistoryRatesComponent,
        ConverterFormComponent
      ],

      imports: [ReactiveFormsModule, MdmModule, FeaturesModule, RouterModule.forRoot([])],
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
});

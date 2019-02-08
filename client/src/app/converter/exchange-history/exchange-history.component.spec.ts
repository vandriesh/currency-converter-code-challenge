import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesService } from '../../features/currencies/currencies.service';
import { MdmModule } from '../../mdm/mdm.module';
import { ExchangeHistoryRatesComponent } from '../exchange-history-rates/exchange-history-rates.component';

import { ExchangeHistoryComponent } from './exchange-history.component';

describe('ExchangeHistoryComponent', () => {
  let component: ExchangeHistoryComponent;
  let fixture: ComponentFixture<ExchangeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeHistoryComponent, ExchangeHistoryRatesComponent],
      imports: [MdmModule, HttpClientTestingModule],
      providers: [CurrenciesService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeHistoryComponent);
    component = fixture.componentInstance;
    component.currency = {
      currency: 'EUR',
      rate: '1.2',
      timestamp: '' + Date.now()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

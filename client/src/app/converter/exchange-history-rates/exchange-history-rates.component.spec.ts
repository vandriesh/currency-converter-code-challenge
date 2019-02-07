import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmModule } from '../../mdm/mdm.module';

import { ExchangeHistoryRatesComponent } from './exchange-history-rates.component';

describe('ExchangeHistoryRatesComponent', () => {
  let component: ExchangeHistoryRatesComponent;
  let fixture: ComponentFixture<ExchangeHistoryRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeHistoryRatesComponent],
      imports: [MdmModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeHistoryRatesComponent);
    component = fixture.componentInstance;
    component.dataSource = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

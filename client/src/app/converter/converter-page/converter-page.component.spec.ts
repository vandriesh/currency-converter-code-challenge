import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrenciesService } from '../../features/currencies/currencies.service';
import { FeaturesModule } from '../../features/features.module';
import { MdmModule } from '../../mdm/mdm.module';

import { ConverterPageComponent } from './converter-page.component';

describe('ConverterPageComponent', () => {
  let component: ConverterPageComponent;
  let fixture: ComponentFixture<ConverterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterPageComponent],
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
});

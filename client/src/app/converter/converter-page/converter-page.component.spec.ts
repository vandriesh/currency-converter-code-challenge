import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MdmModule } from '../../mdm/mdm.module';

import { ConverterPageComponent } from './converter-page.component';

describe('ConverterPageComponent', () => {
  let component: ConverterPageComponent;
  let fixture: ComponentFixture<ConverterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterPageComponent],
      imports: [ReactiveFormsModule, MdmModule]
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

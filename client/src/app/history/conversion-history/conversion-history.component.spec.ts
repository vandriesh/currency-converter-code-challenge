import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MdmModule } from '../../mdm/mdm.module';

import { ConversionHistoryComponent } from './conversion-history.component';

describe('ConversionHistoryComponent', () => {
  let component: ConversionHistoryComponent;
  let fixture: ComponentFixture<ConversionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConversionHistoryComponent],
      imports: [MdmModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionHistoryComponent);
    component = fixture.componentInstance;
    component.dataSource = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

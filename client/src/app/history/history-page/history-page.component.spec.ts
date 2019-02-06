import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmModule } from '../../mdm/mdm.module';
import { StorageModule } from '../../storage/storage.module';
import { ConversionHistoryComponent } from '../conversion-history/conversion-history.component';

import { HistoryPageComponent } from './history-page.component';

describe('HistoryPageComponent', () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPageComponent, ConversionHistoryComponent ],
      imports: [MdmModule, StorageModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

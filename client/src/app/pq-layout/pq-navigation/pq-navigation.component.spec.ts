import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MdmModule } from '../../mdm/mdm.module';

import { PqNavigationComponent } from './pq-navigation.component';

describe('PqNavigationComponent', () => {
  let component: PqNavigationComponent;
  let fixture: ComponentFixture<PqNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PqNavigationComponent],
      imports: [
        NoopAnimationsModule,
        MdmModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PqNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

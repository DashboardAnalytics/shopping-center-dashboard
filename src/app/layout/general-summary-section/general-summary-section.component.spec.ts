import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSummarySectionComponent } from './general-summary-section.component';

describe('GeneralSummarySectionComponent', () => {
  let component: GeneralSummarySectionComponent;
  let fixture: ComponentFixture<GeneralSummarySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSummarySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSummarySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

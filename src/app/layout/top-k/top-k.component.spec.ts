import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopKComponent } from './top-k.component';

describe('TopKComponent', () => {
  let component: TopKComponent;
  let fixture: ComponentFixture<TopKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotdogComponent } from './hotdog.component';

describe('HotdogComponent', () => {
  let component: HotdogComponent;
  let fixture: ComponentFixture<HotdogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotdogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotdogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

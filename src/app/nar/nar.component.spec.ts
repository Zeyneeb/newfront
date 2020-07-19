import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NARComponent } from './nar.component';

describe('NARComponent', () => {
  let component: NARComponent;
  let fixture: ComponentFixture<NARComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NARComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellulesComponent } from './cellules.component';

describe('CellulesComponent', () => {
  let component: CellulesComponent;
  let fixture: ComponentFixture<CellulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

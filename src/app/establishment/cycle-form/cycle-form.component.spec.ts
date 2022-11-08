import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleFormComponent } from './cycle-form.component';

describe('CycleFormComponent', () => {
  let component: CycleFormComponent;
  let fixture: ComponentFixture<CycleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleListComponent } from './cycle-list.component';

describe('CycleListComponent', () => {
  let component: CycleListComponent;
  let fixture: ComponentFixture<CycleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

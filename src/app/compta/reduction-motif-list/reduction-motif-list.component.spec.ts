import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReductionMotifListComponent } from './reduction-motif-list.component';

describe('ReductionMotifListComponent', () => {
  let component: ReductionMotifListComponent;
  let fixture: ComponentFixture<ReductionMotifListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReductionMotifListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReductionMotifListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

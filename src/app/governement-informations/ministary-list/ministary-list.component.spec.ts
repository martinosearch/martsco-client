import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistaryListComponent } from './ministary-list.component';

describe('MinistaryListComponent', () => {
  let component: MinistaryListComponent;
  let fixture: ComponentFixture<MinistaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinistaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

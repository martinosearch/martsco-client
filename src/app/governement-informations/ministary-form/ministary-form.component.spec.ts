import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistaryFormComponent } from './ministary-form.component';

describe('MinistaryFormComponent', () => {
  let component: MinistaryFormComponent;
  let fixture: ComponentFixture<MinistaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinistaryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

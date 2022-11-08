import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTypeFormComponent } from './subject-type-form.component';

describe('SubjectTypeFormComponent', () => {
  let component: SubjectTypeFormComponent;
  let fixture: ComponentFixture<SubjectTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

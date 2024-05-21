import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFormComponent } from './subject-form.component';

describe('SubjectFormComponent', () => {
  let component: SubjectFormComponent;
  let fixture: ComponentFixture<SubjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

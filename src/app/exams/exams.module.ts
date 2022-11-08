import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamMenuComponent } from './exam-menu/exam-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExamDashboardComponent } from './exam-dashboard/exam-dashboard.component';
import { ExamsRoutingModule } from './exams-routing.module';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { ExamEstablishmentListComponent } from './exam-establishment-list/exam-establishment-list.component';
import { ExamComponent } from './exam-list/exam.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { ExamChooserComponent } from './exam-chooser/exam-chooser.component';
import { SaisieNoteFormExamComponent } from './saisie-note-form-exam/saisie-note-form-exam.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { ExamEstablishmentFormComponent } from './exam-establishment-form/exam-establishment-form.component';

@NgModule({
  declarations: [
    ExamComponent, ExamMenuComponent, ExamDashboardComponent, ExamDashboardComponent,
    ExamFormComponent, ExamEstablishmentListComponent, CandidateListComponent,
    ExamEstablishmentFormComponent,
    CandidateFormComponent, ExamChooserComponent, SaisieNoteFormExamComponent
  ],

  imports: [
    CommonModule, UtilitiesModule, NoopAnimationsModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule, ExamsRoutingModule
  ],

  exports: [
    ExamMenuComponent, ExamDashboardComponent
  ],

  entryComponents: [
    ExamFormComponent, ExamEstablishmentFormComponent, CandidateFormComponent, ExamChooserComponent,
    SaisieNoteFormExamComponent
  ]
})
export class ExamsModule { }

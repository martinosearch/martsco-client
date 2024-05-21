import { NgModule } from '@angular/core';
import { ExamComponent } from './exam-list/exam.component';
import { RouterModule } from '@angular/router';
import { SubjectListComponent } from '../subject-mg/subject-list/subject-list.component';
import { ExamEstablishmentListComponent } from './exam-establishment-list/exam-establishment-list.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

const routes = [
  { path: 'exam/list', component: ExamComponent },
  { path: 'subject-exam/list', component: SubjectListComponent },
  { path: 'establishment-exam-identity/list', component: ExamEstablishmentListComponent },
  { path: 'candidate/list', component: CandidateListComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }

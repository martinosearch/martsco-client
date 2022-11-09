import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssuranceFormComponent } from './assurance/assurance-form/assurance-form.component';
import { AssuranceListComponent } from './assurance/assurance-list/assurance-list.component';
import { CashRegisterFormComponent } from './compta/cash-register-form/cash-register-form.component';
import { ExpenseFormComponent } from './compta/expense-form/expense-form.component';
import { ExpenseListComponent } from './compta/expense-list/expense-list.component';
import { ReductionMotifFormComponent } from './compta/reduction-motif-form/reduction-motif-form.component';
import { ReductionMotifListComponent } from './compta/reduction-motif-list/reduction-motif-list.component';
import { ReductionStudentFormComponent } from './compta/reduction-student-form/reduction-student-form.component';
import { ReductionStudentListComponent } from './compta/reduction-student-list/reduction-student-list.component';
import { EmployeeFormComponent } from './employees-mg/employee-form/employee-form.component';
import { EmployeeListComponent } from './employees-mg/employee-list/employee-list.component';
import { AcademicStandartFormComponent } from './establishment/academic-standart-form/academic-standart-form.component';
import { AcademicStandartListComponent } from './establishment/academic-standart-list/academic-standart-list.component';
import { DecoupageFormComponent } from './establishment/decoupage-form/decoupage-form.component';
import { DecoupageListComponent } from './establishment/decoupage-list/decoupage-list.component';
import { EstablishmentFormComponent } from './establishment/establishment-form/establishment-form.component';
import { EstablishmentListComponent } from './establishment/establishment-list/establishment-list.component';
import { EstablishmentTypeFormComponent } from './establishment/establishment-type-form/establishment-type-form.component';
import { EstablishmentTypeListComponent } from './establishment/establishment-type-list/establishment-type-list.component';
import { ParamSchoolComponent } from './establishment/param-school/param-school.component';
import { SchoolClassFormComponent } from './establishment/school-class-form/school-class-form.component';
import { SchoolClassListComponent } from './establishment/school-class-list/school-class-list.component';
import { WelcomeComponent } from './establishment/welcome/welcome.component';
import { YearFormComponent } from './establishment/year-form/year-form.component';
import { YearListComponent } from './establishment/year-list/year-list.component';
import { EvaluationFormComponent } from './evaluation-trim/evaluation-form/evaluation-form.component';
import { EvaluationListComponent } from './evaluation-trim/evaluation-list/evaluation-list.component';
import { EvaluationTypeFormComponent } from './evaluation-trim/evaluation-type-form/evaluation-type-form.component';
import { EvaluationTypeListComponent } from './evaluation-trim/evaluation-type-list/evaluation-type-list.component';
import { SubjectFormComponent } from './subject-mg/subject-form/subject-form.component';
import { SubjectListComponent } from './subject-mg/subject-list/subject-list.component';
import { SubjectTypeFormComponent } from './subject-mg/subject-type-form/subject-type-form.component';
import { SubjectTypeListComponent } from './subject-mg/subject-type-list/subject-type-list.component';
import { ForfaitStateComponent } from './utilities/forfait-state/forfait-state.component';
import { JournalShowComponent } from './utilities/journal-show/journal-show.component';
import { OldVersionComponent } from './utilities/old-version/old-version.component';
import { ParamSoftComponent } from './utilities/param-soft/param-soft.component';
import { PdfViewerComponent } from './utilities/pdf-viewer/pdf-viewer.component';
import { cacheInterceptorProviders } from './utilities/services/cache-interceptor.service';
import { UserDashboardComponent } from './utilities/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './utilities/user-form/user-form.component';
import { UserListComponent } from './utilities/user-list/user-list.component';
import { UserParametersComponent } from './utilities/user-parameters/user-parameters.component';

const routes: Routes = [{ path: '', redirectTo: '/welcome', pathMatch: 'full' },
{ path: 'welcome', component: WelcomeComponent },

// user
{ path: 'user/list', component: UserListComponent },
{ path: 'user/form', component: UserFormComponent },


// employee
{ path: 'employee/list', component: EmployeeListComponent },
{ path: 'employee/form', component: EmployeeFormComponent },

// year
{ path: 'year-app/list', component: YearListComponent },
{ path: 'year-app/form', component: YearFormComponent },

// school-class
{ path: 'school-class/list', component: SchoolClassListComponent },
{ path: 'school-class/form', component: SchoolClassFormComponent },

// assurance
{ path: 'assurance/list', component: AssuranceListComponent },
{ path: 'assurance/form', component: AssuranceFormComponent },

// academic-standart
{ path: 'academic-standart/list', component: AcademicStandartListComponent },
{ path: 'academic-standart/form', component: AcademicStandartFormComponent },

// type establishment
{ path: 'establishment-type/list', component: EstablishmentTypeListComponent },
{ path: 'establishment-type/form', component: EstablishmentTypeFormComponent },

// type expense
{ path: 'expense/list', component: ExpenseListComponent },
{ path: 'expense/form', component: ExpenseFormComponent },

// establishment
{ path: 'establishment/list', component: EstablishmentListComponent },
{ path: 'establishment/form', component: EstablishmentFormComponent },


//subject
{ path: 'subject/list', component: SubjectListComponent },
{ path: 'subject/form', component: SubjectFormComponent },
{ path: 'subject-type/list', component: SubjectTypeListComponent },
{ path: 'subject-type/form', component: SubjectTypeFormComponent },

//evaluation
{ path: 'evaluation/list', component: EvaluationListComponent },
{ path: 'evaluation/form', component: EvaluationFormComponent },
{ path: 'evaluation-type/list', component: EvaluationTypeListComponent },
{ path: 'evaluation-type/form', component: EvaluationTypeFormComponent },

// principal menu
{ path: 'mycash-register/form', component: CashRegisterFormComponent },
{ path: 'app-journal/show', component: JournalShowComponent },
{ path: 'param-soft/show', component: ParamSoftComponent },
{ path: 'param-school/show', component: ParamSchoolComponent },

// forfait state
{ path: 'forfait-state/show', component: ForfaitStateComponent },

// pdfViewer
{ path: 'pdfViewer/show', component: PdfViewerComponent },

// user menu
{ path: 'user-params/show', component: UserParametersComponent },
{ path: 'user-dashboard/show', component: UserDashboardComponent },

// old version tool
{ path: 'old-version/show', component: OldVersionComponent },

// redution motive
{ path: 'reduction-motive/list', component: ReductionMotifListComponent },
{ path: 'reduction-motive/form', component: ReductionMotifFormComponent },
{ path: 'reduction-student/list', component: ReductionStudentListComponent },
{ path: 'reduction-student/list', component: ReductionStudentFormComponent },

// decoupage
{ path: 'decoupage/list', component: DecoupageListComponent },
{ path: 'decoupage/form', component: DecoupageFormComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssuranceFormComponent } from 'src/app/assurance/assurance-form/assurance-form.component';
import { AssuranceListComponent } from 'src/app/assurance/assurance-list/assurance-list.component';
import {
  SchoolClassChooserFormComponent,
} from 'src/app/establishment/school-class-chooser-form/class-chooser-form.component';
import { SubjectFormComponent } from 'src/app/subject-mg/subject-form/subject-form.component';
import { SubjectListComponent } from 'src/app/subject-mg/subject-list/subject-list.component';
import { SubjectTypeFormComponent } from 'src/app/subject-mg/subject-type-form/subject-type-form.component';
import { SubjectTypeListComponent } from 'src/app/subject-mg/subject-type-list/subject-type-list.component';

import {
  AcademicStandartFormComponent,
} from './academic-standart-form/academic-standart-form.component';
import {
  AcademicStandartListComponent,
} from './academic-standart-list/academic-standart-list.component';
import { EstablishmentFormComponent } from './establishment-form/establishment-form.component';
import { EstablishmentListComponent } from './establishment-list/establishment-list.component';
import { EstablishmentMenuComponent } from './establishment-menu/establishment-menu.component';
import {
  EstablishmentTypeFormComponent,
} from './establishment-type-form/establishment-type-form.component';
import {
  EstablishmentTypeListComponent,
} from './establishment-type-list/establishment-type-list.component';
import { SchoolClassFormComponent } from './school-class-form/school-class-form.component';
import { SchoolClassListComponent } from './school-class-list/school-class-list.component';
import { YearFormComponent } from './year-form/year-form.component';
import { YearListComponent } from './year-list/year-list.component';
import { ParamSchoolComponent } from 'src/app/establishment/param-school/param-school.component';

import { CountryFormComponent } from 'src/app/governement-informations/country-form/country-form.component';
import { CountryListComponent } from 'src/app/governement-informations/country-list/country-list.component';
import { MinistaryFormComponent } from 'src/app/governement-informations/ministary-form/ministary-form.component';
import { MinistaryListComponent } from 'src/app/governement-informations/ministary-list/ministary-list.component';
import { EstablishmentDashbordComponent } from './establishment-dashbord/establishment-dashbord.component';
import { CycleListComponent } from './cycle-list/cycle-list.component';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { ComptaModule } from '../compta/compta.module';
import { ExamsModule } from '../exams/exams.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ExamNationalListComponent } from './exam-national-list/exam-national-list.component';
import { ExamNationalFormComponent } from './exam-national-form/exam-national-form.component';
import { DecoupageFormComponent } from './decoupage-form/decoupage-form.component';
import { DecoupageListComponent } from './decoupage-list/decoupage-list.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    EstablishmentListComponent, EstablishmentFormComponent,
    EstablishmentTypeFormComponent,
    EstablishmentTypeListComponent, EstablishmentMenuComponent,
    EstablishmentDashbordComponent,
    ParamSchoolComponent,
    YearListComponent, YearFormComponent,
    DecoupageListComponent, DecoupageFormComponent,
    SchoolClassListComponent, SchoolClassFormComponent, SchoolClassChooserFormComponent,
    AcademicStandartListComponent, AcademicStandartFormComponent,
    AssuranceListComponent, AssuranceFormComponent,
    SubjectTypeListComponent, SubjectTypeFormComponent, SubjectListComponent,
    SubjectFormComponent,
    CountryListComponent, CountryFormComponent,
    MinistaryFormComponent, MinistaryListComponent,
    CycleListComponent, CycleFormComponent, ExamNationalListComponent,
    ExamNationalFormComponent
  ],

  imports: [
    CommonModule, UtilitiesModule, ComptaModule, ExamsModule, FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
  ],

  exports: [
    EstablishmentMenuComponent, EstablishmentDashbordComponent
  ],

  entryComponents: [
    SchoolClassFormComponent, MinistaryFormComponent, CountryFormComponent,
    YearFormComponent, EstablishmentFormComponent, SchoolClassChooserFormComponent,
    ExamNationalFormComponent
  ]

})

export class EstablishmentModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoefSettingComponent } from 'src/app/evaluation-trim/coef-setting/coef-setting.component';
import { ConfigEvalFormComponent } from 'src/app/evaluation-trim/config-eval-form/config-eval-form.component';
import { EvaluationFormComponent } from 'src/app/evaluation-trim/evaluation-form/evaluation-form.component';
import { EvaluationListComponent } from 'src/app/evaluation-trim/evaluation-list/evaluation-list.component';
import {
  EvaluationTrimMenuComponent,
} from 'src/app/evaluation-trim/evaluation-trim-menu/evaluation-trim-menu.component';
import {
  EvaluationTypeFormComponent,
} from 'src/app/evaluation-trim/evaluation-type-form/evaluation-type-form.component';
import {
  EvaluationTypeListComponent,
} from 'src/app/evaluation-trim/evaluation-type-list/evaluation-type-list.component';
import { SaisieNoteFormComponent } from 'src/app/evaluation-trim/saisie-note-form/saisie-note-form.component';
import { SubjectAttributionComponent } from 'src/app/evaluation-trim/subject-attribution/subject-attribution.component';
import { MaterialModule } from '../utilities/material.module';


@NgModule({
  declarations: [
    SubjectAttributionComponent,
    EvaluationTrimMenuComponent,
    EvaluationTypeListComponent,
    EvaluationTypeFormComponent,
    EvaluationListComponent,
    EvaluationFormComponent,
    SaisieNoteFormComponent,
    ConfigEvalFormComponent,
    CoefSettingComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule
  ],

  exports: [
    EvaluationTrimMenuComponent,
  ],

  entryComponents: [SubjectAttributionComponent,
    SaisieNoteFormComponent, ConfigEvalFormComponent, CoefSettingComponent]
})
export class EvaluationTrimModule { }

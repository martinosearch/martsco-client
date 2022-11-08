import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsListComponent } from '../establishment/parents-list/parents-list.component';
import { RepartionManuelleComponent } from './repartion-manuelle/repartion-manuelle.component';
import { RepartionComponent } from './repartion/repartion.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../utilities/material.module';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  declarations: [
    RepartionComponent,
    StudentListComponent,
    StudentFormComponent,
    RepartionManuelleComponent,
    ParentsListComponent,
  ],
  imports: [
    CommonModule, UtilitiesModule, FormsModule, ReactiveFormsModule,
  ],

  exports: []
})
export class StudentMgModule { }

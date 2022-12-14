import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UtilitiesModule } from '../utilities/utilities.module';
import { MaterialModule } from '../utilities/material.module';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
  ],

  imports: [
    CommonModule, UtilitiesModule, FormsModule, ReactiveFormsModule, MaterialModule
  ],

  entryComponents: [
    EmployeeFormComponent
  ]
})
export class EmployeesMgModule { }

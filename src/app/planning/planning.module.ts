import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { PlanningMenuComponent } from 'src/app/planning/planning-menu/planning-menu.component';

import { MaterialModule } from '../utilities/material.module';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  declarations: [
    PlanningMenuComponent,
  ],
  imports: [
    CommonModule, MaterialModule, UtilitiesModule,
    FlexLayoutModule, FormsModule, ReactiveFormsModule, PdfJsViewerModule,
  ],
  exports: [
    PlanningMenuComponent,
  ]
})
export class PlanningModule { }

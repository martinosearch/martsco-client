import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { AssuranceMenuComponent } from 'src/app/assurance/assurance-menu/assurance-menu.component';

@NgModule({
  declarations: [
    AssuranceMenuComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule, FormsModule, ReactiveFormsModule, PdfJsViewerModule,
  ],
  exports: [
    AssuranceMenuComponent,
  ]
})
export class AssuranceModule { }

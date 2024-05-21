import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { CantineMenuComponent } from './cantine-menu/cantine-menu.component';

@NgModule({
  declarations: [
    CantineMenuComponent,
  ],

  imports: [
    CommonModule,
    FlexLayoutModule, FormsModule, ReactiveFormsModule, PdfJsViewerModule,
  ],

  exports: [
    CantineMenuComponent,
  ]

})
export class CantineModule { }

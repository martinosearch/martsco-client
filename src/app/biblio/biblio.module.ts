import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { BiblioMenuComponent } from 'src/app/biblio/biblio-menu/biblio-menu.component';

import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  declarations: [
    BiblioMenuComponent,
  ],
  imports: [
    CommonModule, UtilitiesModule,
    FlexLayoutModule, FormsModule, ReactiveFormsModule, PdfJsViewerModule,
  ],
  exports: [
    BiblioMenuComponent,
  ]
})
export class BiblioModule { }

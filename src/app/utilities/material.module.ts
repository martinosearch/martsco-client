import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';

const materials = [
  MatMenuModule, MatSidenavModule, MatToolbarModule, MatIconModule,
  MatListModule, MatCardModule, MatButtonModule, MatTableModule,
  MatDialogModule, MatInputModule, MatSelectModule, MatCheckboxModule,
  MatAutocompleteModule, MatProgressBarModule, MatSnackBarModule, MatDatepickerModule,
  MatGridListModule, MatRadioModule, MatFormFieldModule, MatExpansionModule, MatTabsModule,
  MatProgressSpinnerModule, MatNativeDateModule
];

@NgModule({
  imports: materials,
  exports: materials
})
export class MaterialModule { }

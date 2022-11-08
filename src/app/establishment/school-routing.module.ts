import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CountryListComponent } from 'src/app/governement-informations/country-list/country-list.component';
import { MinistaryListComponent } from 'src/app/governement-informations/ministary-list/ministary-list.component';
import { ExamNationalListComponent } from './exam-national-list/exam-national-list.component';

const routes: Routes = [
  { path: 'country/list', component: CountryListComponent },
  { path: 'ministary/list', component: MinistaryListComponent },
  { path: 'exam-national/list', component: ExamNationalListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }

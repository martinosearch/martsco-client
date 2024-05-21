import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentsListComponent } from '../establishment/parents-list/parents-list.component';
import { RepartionManuelleComponent } from './repartion-manuelle/repartion-manuelle.component';
import { RepartionComponent } from './repartion/repartion.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';


const routes: Routes = [
  // student
  { path: 'student/list', component: StudentListComponent },
  { path: 'student/form', component: StudentFormComponent },
  { path: 'student/repartition', component: RepartionComponent },
  { path: 'student/repartition-manuelle', component: RepartionManuelleComponent },
  { path: 'parent/list', component: ParentsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StudentMgRoutingModule { }

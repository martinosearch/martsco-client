import { Component, OnInit } from '@angular/core';
import { EmployeeIdentityService } from 'src/app/employees-mg/services/employee-identity.service';
import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { EffectifBean } from 'src/app/student-mg/models/effectif-bean';
import { StudentIdentityBean } from 'src/app/student-mg/models/studentIdentityBean';
import { StudentIdentityService } from 'src/app/student-mg/services/student-identity.service';
import { SubjectService } from 'src/app/subject-mg/subject.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { SchoolClassIdentityBean } from '../models/school-class-identity-bean';
import { SchoolClassIdentityService } from '../services/school-class-identity.service';

@Component({
  selector: 'app-establishment-dashbord',
  templateUrl: './establishment-dashbord.component.html',
  styleUrls: ['./establishment-dashbord.component.scss']
})
export class EstablishmentDashbordComponent implements OnInit {
  displayedColumns = ['class', 'male', 'female', 'sum'];
  studentsDisplayedColumns = ['num', 'date', 'nom', 'prenoms', 'sexe', 'matricule', 'classe'];

  twentythStudents: StudentIdentityBean[] = [];
  classes: SchoolClassIdentityBean[] = [];
  employees: EmployeeIdentityBean[] = [];
  effectifBeans: EffectifBean[] = [];
  totalEffectifBean = new EffectifBean();
  numberOfClasses = 0;
  numberOfEmployees: number = 0;
  numberOfSubjects: number = 0;


  constructor(private constanceService: ConstanceService,
    private schoolClassIdentityService: SchoolClassIdentityService,
    private employeeService: EmployeeIdentityService, private subjectService: SubjectService,
    public studentIdentityService: StudentIdentityService) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((respYear) => {
      this.studentIdentityService.getTotalEffectifBean(respYear.id).subscribe((respTot) => {
        this.totalEffectifBean = respTot;
      });

      this.studentIdentityService.getEffectifBeans(respYear.id).subscribe((respEff) => {
        this.effectifBeans = respEff;
      });

      this.schoolClassIdentityService.getAll().subscribe((resp) => {
        this.numberOfClasses = resp.length;
      });

      this.employeeService.getAll().subscribe((resp) => {
        this.numberOfEmployees = resp.length;
        this.employees = resp;
      });

      this.subjectService.getAll().subscribe((resp) => {
        this.numberOfSubjects = resp.length;
      });

      this.studentIdentityService.getNthRegistered(respYear.id, 20).subscribe((resp) => {
        this.twentythStudents = resp;
      });

    });
  }
}

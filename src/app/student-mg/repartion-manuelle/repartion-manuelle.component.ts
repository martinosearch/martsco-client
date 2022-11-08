import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { StudentIdentityBean } from 'src/app/student-mg/models/studentIdentityBean';

import { ComptaReportingService } from '../../compta/services/compta-reporting.service';
import { EmployeeIdentityService } from '../../employees-mg/services/employee-identity.service';
import { ConstanceService } from '../../utilities/services/constance.service';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { ActionService } from 'src/app/utilities/services/action.service';
import { ClassChooserModel } from 'src/app/establishment/models/class-chooser-model';
import { SchoolClassChooserFormComponent } from '../../establishment/school-class-chooser-form/class-chooser-form.component';
import { Year } from 'src/app/establishment/models/year';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { StudentCursusBean } from 'src/app/student-mg/models/studentCursusBean';
import { StudentCursusService } from '../services/student-cursus.service';
import { StudentIdentityService } from '../services/student-identity.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { YearService } from 'src/app/establishment/services/year.service';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-repartion-manuelle',
  templateUrl: './repartion-manuelle.component.html',
  styleUrls: ['./repartion-manuelle.component.scss']
})
export class RepartionManuelleComponent implements OnInit {
  displayedColumns = ['num', 'nom', 'prenom', 'sex'];

  // for autocomplete
  public studentControl = new FormControl();
  public studentIdentityList: StudentIdentityBean[] = [];
  public studentCursusList: StudentCursusBean[] = [];

  public listStudentThisClass: StudentIdentityBean[] = [];
  public studentFilteredList: StudentIdentityBean[] = [];

  public currentStudentIdentityBean = new StudentIdentityBean();
  public filterText: StudentIdentityBean | string = "";

  currentYear: Year;
  currentUser: EmployeeIdentityBean;
  currentSchoolClass: SchoolClassIdentityBean;
  currentStudentSchoolClass: SchoolClassIdentityBean;
  effectif: number;

  constructor(
    public dialog: MatDialog,
    public studentCursusService: StudentCursusService, private studentIdentityService: StudentIdentityService,
    public authService: AuthService, private messageService: MessageService,
    public employeeService: EmployeeIdentityService, public progressService: ProgressService,
    public snackBar: MatSnackBar, public actionService: ActionService, private yearService: YearService,
    public constanceService: ConstanceService, public comptaReportingService: ComptaReportingService
  ) { }

  ngOnInit() {
    this.constanceService.setCurrentSection("Redistribution des élèves");
    const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
      width: '600px',
      data: { titre: 'Choisir la classe d\'accueil' }
    });

    dialogRef.componentInstance.eventEmitter.subscribe(
      (resp: ClassChooserModel) => {
        this.currentYear = resp.year;
        this.currentSchoolClass = resp.schoolClass;
        this.refreshThisClass();
        this.refreshHoleSchool();
      }
    );
  }

  onModifierClassActuelle() {
    const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
      width: '600px',
      data: { titre: 'Choisir la classe d\'accueil' }
    });

    dialogRef.componentInstance.eventEmitter.subscribe(
      (resp: ClassChooserModel) => {
        this.currentSchoolClass = resp.schoolClass;
        this.refreshThisClass();
      }
    );
  }

  refreshHoleSchool() {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);
      // getting list of hole students
      this.studentCursusService.getAllByYear(this.currentYear.id).subscribe((respAll) => {
        this.studentCursusList = respAll;
        this.studentIdentityService.getStudentIdentities(respAll).subscribe((respIds) => {
          this.studentIdentityList = respIds;
          this.effectif = respIds.length;
          this.studentFilteredList = respIds;

          this.onFilterStudent();

          this.actionService.stopWaiting(progressId);
        });
      });
    });
  }

  refreshThisClass() {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);
      this.studentCursusService.getAllByClass(this.currentSchoolClass.id, this.currentYear.id)
        .subscribe(
          (resp) => {
            this.studentIdentityService.getStudentIdentities(resp).subscribe((respIds) => {
              this.listStudentThisClass = respIds;
              this.actionService.stopWaiting(progressId);
            });
          });
    });
  }

  onFilterStudent() {
    console.log("filter text: " + this.filterText);

    if (typeof this.filterText === 'string') {
      const filterValue = this.filterText.toLowerCase();

      this.studentFilteredList = this.studentIdentityList.filter(option =>
        (option.identity.lastName + ' ' + option.identity.firstName).toLowerCase().includes(filterValue)
      );
    } else {
      this.refreshCurrentStudent(this.filterText);
    }
  }

  refreshCurrentStudent(student: StudentIdentityBean) {
    this.currentStudentIdentityBean = student;
    if (student.id !== undefined) {
      this.studentCursusService.getCurrentCursusFromList(this.studentCursusList, this.currentStudentIdentityBean.id, this.currentYear.id).subscribe(rsp => {
        this.currentStudentSchoolClass = rsp.schoolClass;
      });
    } else {
      this.messageService.showAlertMessage("Veuillez choisir un apprenant!");
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // this display filtered objet in the autocomplete component
  displayStudent(obj: StudentIdentityBean): string {
    if (obj !== null && obj !== undefined) {
      if (obj.identity !== undefined) {
        if (obj.identity.lastName !== undefined) {
          let name = obj.identity.lastName;
          if (obj.identity.lastName !== undefined) {
            name += ' ' + obj.identity.firstName;
          }

          return name;
        }
      }
    }
    return undefined;
  }

  onStudentSubmit() {
    if (this.currentStudentIdentityBean.id === undefined) {
      const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        width: '600px',
        data: { titre: 'Cet élève n\'existe pas. Voulez- vous l\'ajouter?' }
      });

      dialogRef.componentInstance.event.subscribe(resp => {
        const dialogStudentRef = this.dialog.open(StudentFormComponent, {
          width: '1000px',
          data: { titre: 'Ajouter un élève' }
        });

        dialogStudentRef.componentInstance.event.subscribe(
          newStudent => {
            this.refreshThisClass();
            this.refreshHoleSchool();
            this.effectif++;
          }
        );
      });

    } else {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        this.actionService.launchWaiting(progressId);
        this.studentIdentityService.save(this.currentStudentIdentityBean, this.currentSchoolClass).subscribe((respId) => {
          this.refreshHoleSchool();
          this.studentCursusService.save(this.currentStudentIdentityBean,
            this.currentSchoolClass, this.currentYear, 0).subscribe(resp => {
              this.refreshThisClass();
              this.refreshHoleSchool();
              this.reInit();
              this.actionService.stopWaiting(progressId);
            });
        });
      });
    }
  }

  reInit() {
    this.filterText = "";
    this.currentStudentIdentityBean = new StudentIdentityBean();
    this.currentStudentSchoolClass = undefined;
  }

  onModifierInfo() {
    const data = Object.assign({}, this.currentStudentIdentityBean);
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '1000px',
      data: { titre: 'Modifier', obj: data }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refreshHoleSchool();
      }
    );
  }
}

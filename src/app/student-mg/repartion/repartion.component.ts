import { Component, OnInit } from '@angular/core';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { YearService } from 'src/app/establishment/services/year.service';
import { Year } from 'src/app/establishment/models/year';
import { AcademicStandardService } from 'src/app/establishment/services/academic-standard.service';
import { SchoolClassIdentityService } from 'src/app/establishment/services/school-class-identity.service';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { ResultAnnuelDataService } from 'src/app/establishment/services/result-annuel-data.service';
import { ResultAnnuelData } from 'src/app/establishment/models/result-annuel-data';
import { StudentIdentityBean } from 'src/app/student-mg/models/studentIdentityBean';
import { ActionService } from 'src/app/utilities/services/action.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/utilities/services/message.service';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { StudentCursusBean } from '../models/studentCursusBean';
import { StudentIdentityService } from '../services/student-identity.service';
import { AcademicStandardIdentityBean } from 'src/app/establishment/models/academic-standard-identity-bean';
import { StudentCursusService } from '../services/student-cursus.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repartion',
  templateUrl: './repartion.component.html',
  styleUrls: ['./repartion.component.scss']
})
export class RepartionComponent implements OnInit {
  previousYearId: number;
  previousSchoolClassId: number;

  currentYearId: number;
  currentStandardId: number;

  years: Year[] = [];
  standards: AcademicStandardIdentityBean[] = [];
  classes: SchoolClassIdentityBean[] = [];
  filteredClasses: SchoolClassIdentityBean[] = [];
  results: ResultAnnuelData[] = [];
  filteredStudentList: StudentIdentityBean[] = [];
  studentCursuBeanList: StudentCursusBean[] = [];

  currentYear: Year;
  previousYear: Year;

  currentStudentIdBean = new StudentIdentityBean();
  indexStudent = 0;
  yearChange = 0;

  displayedColumns = [
    'num',
    'name',
  ];

  listAdmis = true;
  actualized = false;
  sendAll = false;
  notPreInitialised = true;

  constructor(public constanceService: ConstanceService, public yearService: YearService,
    public standardService: AcademicStandardService, public schoolClasseService: SchoolClassIdentityService,
    public resultAnnuelDataService: ResultAnnuelDataService, public actionService: ActionService,
    public progressService: ProgressService, public studentCursusService: StudentCursusService,
    public studentIdentityService: StudentIdentityService, public messageService: MessageService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.yearChange = 0;

    this.constanceService.currentYearSubject.subscribe((respYear) => {
      this.currentYear = respYear;
      this.currentYearId = this.currentYear.id;

      this.yearService.getAll().subscribe((resp) => {
        this.years = resp;

        this.previousYear = this.years[0];
        this.previousYearId = this.previousYear.id;

        this.standardService.getAll().subscribe((resp) => {
          this.standards = resp;
          this.currentStandardId = this.standards[0].id;

          this.schoolClasseService.getAll().subscribe((resp) => {
            this.classes = resp;
            this.filteredClass();
            this.previousSchoolClassId = this.classes[0].id;

            this.setPreInitialized();

            this.yearChange++;
          });
        });
      });
    });
  }

  filteredClass() {
    this.filteredClasses = this.classes.filter(elmt => (elmt.standard.id === this.currentStandardId));
  }

  refresh(option: boolean) {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);

      this.studentCursusService.getAllByClass(this.previousSchoolClassId, this.previousYearId).subscribe((respCurs) => {
        this.studentCursuBeanList = respCurs;

        if (option === true) {
          this.loadListAdmis().subscribe((resp) => {
            this.actualized = true;
            this.actionService.stopWaiting(progressId);
          });
        } else {
          this.loadListAjournes().subscribe((resp) => {
            this.actualized = true;
            this.actionService.stopWaiting(progressId);
          });
        }

        this.indexStudent = 0;
      });
    });
  }

  loadListAdmis(): Observable<boolean> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        this.resultAnnuelDataService.getAllAdmis(this.previousYearId, this.previousSchoolClassId).subscribe(
          (resp) => {
            console.log("taille result admis: " + this.results.length);

            this.results = resp;

            let tempListStudent = this.results.map((elmt) => {
              return elmt.student;
            });

            //filter those who are already treated
            this.filteredStudentList = tempListStudent.filter((st) => {
              const studentCursBean = this.findCursBean(this.studentCursuBeanList, st.id);

              let exists = false;
              for (const curs of studentCursBean.cursuses) {
                if (curs.year !== null && curs.year !== undefined) {
                  if (curs.year.id === this.currentYearId) {
                    exists = true;
                  }
                }
              }
              return !exists;
            });

            if (this.filteredStudentList.length > 0) {
              this.currentStudentIdBean = this.filteredStudentList[0];
            } else {
              this.currentStudentIdBean = new StudentIdentityBean();
            }

            observer.next(true);
          },

          (error: HttpErrorResponse) => {
            this.messageService.showErrorMessage(error.error.message);
            observer.next(true);
          }
        );
      });
    });
  }

  findCursBean(studentCursuBeanList: StudentCursusBean[], id: number): StudentCursusBean {
    return studentCursuBeanList.filter(item => item.id === id)[0];
  }

  loadListAjournes(): Observable<boolean> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        this.resultAnnuelDataService.getAllAjournes(this.previousYearId, this.previousSchoolClassId).subscribe(
          (resp) => {
            console.log("taille result: " + this.results.length);

            this.results = resp;

            let tempListStudent = this.results.map((elmt) => {
              return elmt.student;
            });

            this.filteredStudentList = tempListStudent.filter((st) => {
              const studentCursBean = this.findCursBean(this.studentCursuBeanList, st.id);

              let exists = false;
              for (const curs of studentCursBean.cursuses) {
                if (curs.year !== null && curs.year !== undefined) {
                  if (curs.year.id === this.currentYearId) {
                    exists = true;
                  }
                }
              }

              return !exists;
            });

            if (this.filteredStudentList.length > 0) {
              this.currentStudentIdBean = this.filteredStudentList[0];
            } else {
              this.currentStudentIdBean = new StudentIdentityBean();
            }

            observer.next(true);
          },

          (error) => {
            this.messageService.showErrorMessage("liste introuvable!");
            observer.next(true);
          }
        );
      });
    });
  }

  setClasse(classe: SchoolClassIdentityBean) {
    console.log("Classe d'accueil: " + classe.designation);

    let dialogRef;

    if (this.sendAll) {
      dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        width: '600px',
        data: {
          titre: "Voulez- vous vraiment introduire tous les apprenants de cette classe à un instant?"
        }
      });
    } else {
      dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        width: '600px',
        data: {
          titre: "Voulez- vous vraiment introduire l'apprenant: " +
            this.currentStudentIdBean.identity.lastName + " "
            + this.currentStudentIdBean.identity.firstName
            + " en " + classe.designation + " ?"
        }
      });
    }

    dialogRef.componentInstance.event.subscribe(response => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        this.actionService.launchWaiting(progressId);

        if (this.sendAll) {
          const tempList = this.filteredStudentList;
          let count = 0;

          for (const student of tempList) {
            console.log("current student: " + student.identity.lastName);

            this.sleep(500).then(() => {
              this.saveStudent(student, classe).subscribe((resp) => {
                this.filteredStudentList = this.filteredStudentList.filter(
                  (elmt) => (elmt.id !== student.id));

                count++;
                console.log(count + " student: " + resp.id);

                if (this.filteredStudentList.length === 0) {
                  this.actionService.stopWaiting(progressId);

                  this.currentStudentIdBean = undefined;
                  this.messageService.showAlertMessage("Terminé !");
                }
              });
            })
          }
        } else {
          console.log("single send");
          this.saveStudent(this.currentStudentIdBean, classe).subscribe((resp) => {
            // remove this student
            this.filteredStudentList = this.filteredStudentList.filter(
              (elmt) => (elmt.id !== this.currentStudentIdBean.id));


            this.actionService.stopWaiting(progressId);

            if (this.filteredStudentList.length > 0) {
              this.setCurrentStudent(0);
            } else {
              this.currentStudentIdBean = undefined;
              this.messageService.showAlertMessage("Terminé !");
            }
          });
        }
      });
    });
  }

  saveStudent(student: StudentIdentityBean, classe: SchoolClassIdentityBean): Observable<any> {
    return this.studentCursusService.save(student, classe, this.currentYear, 0);
  }

  nextStudent() {
    if (this.indexStudent + 1 < this.filteredStudentList.length) {
      this.indexStudent++;
      this.setCurrentStudent(this.indexStudent);
    } else {
      this.currentStudentIdBean = undefined;
      this.messageService.showAlertMessage("Terminé !")
    }
  }

  setCurrentStudent(indexStudent: number) {
    this.currentStudentIdBean = this.filteredStudentList[indexStudent];
  }

  previousStudent() {
    if (this.indexStudent > 0) {
      this.indexStudent--;
      this.setCurrentStudent(this.indexStudent);
    }
  }

  previousYearChange() {
    this.yearService.getOne(this.previousYearId).subscribe((resp) => {
      this.previousYearId = resp.id;

      this.actualized = false;
      this.setPreInitialized();
    });
  }

  previousClassChange() {
    this.actualized = false;
    this.setPreInitialized();
  }

  accueilChange() {
    this.filteredClass();
    this.setPreInitialized();
  }

  typeListChange() {
    this.actualized = false;
    this.setPreInitialized();
  }

  canChooseClass() {
    return !this.notPreInitialised && this.currentStudentIdBean !== undefined
  }

  setPreInitialized() {
    console.log("setPreInitialized");
    this.notPreInitialised = this.previousYearId === undefined || this.currentYearId === this.previousYearId;
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }
}

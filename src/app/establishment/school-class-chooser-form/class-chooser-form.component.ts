import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/compta/models/expense';
import { AcademicStandardSetting } from 'src/app/evaluation-trim/models/academic-standard-setting';
import { Decoupage } from 'src/app/establishment/models/decoupage';
import { Year } from 'src/app/establishment/models/year';
import { AcademicStandardService } from 'src/app/establishment/services/academic-standard.service';
import { SchoolClassIdentityService } from 'src/app/establishment/services/school-class-identity.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { SubjectAttribution } from 'src/app/subject-mg/models/subject-attribution';
import { EvaluationService } from 'src/app/evaluation-trim/services/evaluation.service';
import { YearService } from 'src/app/establishment/services/year.service';
import { SubjectService } from 'src/app/subject-mg/subject.service';
import { Evaluation } from 'src/app/evaluation-trim/models/evaluation';
import { SchoolClassSettingService } from '../services/school-class-setting.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { ExpenseService } from 'src/app/compta/services/expense.service';
import { AcademicStandardIdentityBean } from '../models/academic-standard-identity-bean';
import { ClassChooserModel } from '../models/class-chooser-model';
import { SchoolClassIdentityBean } from '../models/school-class-identity-bean';
import { DecoupageService } from '../services/decoupage.service';

@Component({
  selector: 'app-class-chooser-form',
  templateUrl: './class-chooser-form.component.html',
  styleUrls: ['./class-chooser-form.component.scss']
})
export class SchoolClassChooserFormComponent implements OnInit, OnDestroy {
  public model: ClassChooserModel;
  public eventEmitter: EventEmitter<any> = new EventEmitter();
  public types: AcademicStandardIdentityBean[] = [];
  public schoolClasses: SchoolClassIdentityBean[] = [];
  public years: Year[] = [];
  public expenses: Expense[] = [];
  public standards: AcademicStandardIdentityBean[] = [];
  public subjectAttribs: SubjectAttribution[] = [];
  public decoupages: Decoupage[] = [];
  public evaluations: Evaluation[] = [];

  disableYearSelection = false;

  public yearChooser = false;
  public expenseChooser = false;
  public subjectChooser = false;
  public evaluationChooser = false;
  public decoupageChooser = false;
  public standardChooser = false;
  public schoolClassChooser = true;

  public singleEval = false;

  decoupageId: number;
  yearId: number;
  schoolClassId: number;
  expenseId: number;
  subjectId: number;
  standardId: number;
  currentStandardSetting: AcademicStandardSetting;
  eval1: Evaluation;
  eval2: Evaluation;
  eval3: Evaluation;
  eval4: Evaluation;

  selectedEvaluationId: number;

  niveau: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<SchoolClassChooserFormComponent>, private messageService: MessageService,
    private subjectService: SubjectService, private schoolClassSettingService: SchoolClassSettingService,
    public schoolClassService: SchoolClassIdentityService, private yearService: YearService,
    public constanceService: ConstanceService, public expenseService: ExpenseService,
    private decoupageService: DecoupageService, public standardService: AcademicStandardService,
    public evaluationService: EvaluationService) { }

  ngOnInit() {
    this.disableYearSelection = this.data.disableYearSelection !== null ? this.data.disableYearSelection : false;

    this.yearChooser = this.data.yearChooser !== null ? this.data.yearChooser : false;
    this.expenseChooser = this.data.expenseChooser !== null ? this.data.expenseChooser : false;
    this.subjectChooser = this.data.subjectChooser !== null ? this.data.subjectChooser : false;
    this.decoupageChooser = this.data.decoupageChooser !== null ? this.data.decoupageChooser : true;
    this.standardChooser = this.data.standardChooser !== null ? this.data.standardChooser : false;
    this.evaluationChooser = this.data.standardChooser !== null ? this.data.evaluationChooser : false;
    this.singleEval = this.data.singleEval !== null ? this.data.singleEval : false;

    if (this.standardChooser) {
      this.schoolClassChooser = false;
    }

    this.model = new ClassChooserModel();

    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.model.year = resp;
    });

    //year get all
    this.yearService.getAll().subscribe((years) => {
      this.years = years;
      this.yearId = this.model.year.id;

      this.schoolClassService.getAll().subscribe((schoolClasses) => {
        this.schoolClasses = schoolClasses;
        this.schoolClassId = schoolClasses.length > 0 ? schoolClasses[0].id : undefined;
        this.model.schoolClass = schoolClasses[0];

        this.standardService.getAll().subscribe((standards) => {
          this.standards = standards;
          this.standardId = standards.length > 0 ? standards[0].id : undefined;

          this.decoupageService.getAll().subscribe((decoupages) => {
            this.decoupages = decoupages;
            this.decoupageId = decoupages.length > 0 ? decoupages[0].id : undefined;

            this.expenseService.getAll().subscribe((expenses) => {
              this.expenses = expenses;
              this.expenseId = expenses.length > 0 ? expenses[0].id : undefined;
              this.updateAll();
            }, (error) => {
              this.updateAll();
            });
          }, (error) => {
            this.updateAll();
          });
        }, (error) => {
          this.updateAll();
        });
      }, (error) => {
        this.updateAll();
      });
    }, (error) => {
      this.updateAll();
    });
  }

  updateAll() {
    this.refreshYear().subscribe((resp) => {
      this.refreshAcademicStandard().subscribe((resp) => {
        this.niveau = "AcademicStandard";
        this.refreshSchoolClass().subscribe((resp) => {
          this.niveau = "schoolclasse";
          this.refreshAcademicStandardSettings().subscribe((resp) => {
            this.niveau = "stand setting";
            this.refreshSubjectAttribList().subscribe((resp) => {
              this.niveau = "subject attrib list";
              this.refreshSelectedSubjectAttribInfo().subscribe((resp) => {
                this.refreshExpense().subscribe((resp) => {
                  console.log("I was executed");
                });
              });
            });
          });
        });
      });
    });
  }

  refreshYear(): Observable<any> {
    return new Observable((observer) => {
      this.yearService.getOne(this.yearId).subscribe(
        (year) => {
          this.model.year = year;
          observer.next();
        },
        error => {
          observer.next();
        }
      );
    });
  }

  refreshAcademicStandard(): Observable<any> {
    return new Observable((observer) => {
      if (this.standardChooser) {
        this.standardService.getOne(this.standardId).subscribe((standard) => {
          this.model.standard = standard;
          this.refreshEvaluationsSettings().subscribe((resp) => {
            observer.next();
          });
        },
          (error) => {
            this.refreshEvaluationsSettings().subscribe((resp) => {
              observer.next();
            });
          }
        );
      } else {
        this.refreshEvaluationsSettings().subscribe((resp) => {
          observer.next();
        });
      }
    });
  }

  refreshSchoolClass(): Observable<any> {
    return new Observable((observer) => {
      if (this.schoolClassChooser) {
        this.schoolClassService.getOne(this.schoolClassId).subscribe(
          (schoolClass) => {
            this.model.schoolClass = schoolClass;
            this.model.standard = schoolClass.standard;
            this.standardId = schoolClass.standard.id;

            this.refreshAcademicStandard().subscribe((resp) => {
              observer.next();
            });
          },
          (error) => {
            observer.next();
          });
      } else {
        observer.next();
      }
    });
  }

  refreshEvaluationsSettings(): Observable<any> {
    return new Observable((observer) => {
      if (this.evaluationChooser) {
        this.evaluationService.findEvaluationOfThisTrimestre(this.decoupageId, this.model.year.id).subscribe((resp) => {
          this.evaluations = resp;

          observer.next();
        });
      } else {
        observer.next();
      }
    });
  }

  refreshAcademicStandardSettings(): Observable<any> {
    return new Observable((observer) => {
      if (this.standardChooser || this.schoolClassChooser) {
        this.standardService.getAcademicStandardBullResultModel(this.standardId).subscribe((respSetBean) => {
          this.standardService.getCurrentSetting(
            respSetBean, this.yearId).subscribe(
              (setting) => {
                this.currentStandardSetting = setting;

                // filter decoupage
                this.refreshDecoupageList().subscribe(
                  (resp) => {
                    this.refreshEvaluationsSettings().subscribe((resp) => {
                      observer.next();
                    });
                  },
                  (error) => {
                    this.refreshEvaluationsSettings().subscribe((resp) => {
                      observer.next();
                    });
                  });
              },
              (error) => {
                this.refreshEvaluationsSettings().subscribe((resp) => {
                  observer.next();
                });
              });
        });
      } else {
        observer.next();
      }
    });
  }

  refreshDecoupageList(): Observable<any> {
    return new Observable((observer) => {
      if (this.decoupageChooser) {
        this.decoupageService.getAll().subscribe(
          (resp) => {
            if (this.currentStandardSetting !== undefined) {
              // console.log("decoupage type according to setting: " + this.currentStandardSetting.decoupageType.designation);

              if (this.currentStandardSetting.decoupageType.designation.charAt(0).toLowerCase() === "s") {
                this.decoupages = resp.filter(item => (item.index <= 2));
              } else {
                this.decoupages = resp;
              }
            } else {
              this.messageService.showAlertMessage("Vous devez faire les configurations de ce niveau d'enseignement!");
            }

            console.log("decoupage list size: " + this.decoupages.length);

            if (this.decoupageId !== undefined) {
              if (this.model.decoupage !== undefined) {
                this.decoupageId = this.model.decoupage.index <= this.decoupages.length ?
                  this.decoupageId : this.decoupages[0].id;
              } else {
                this.decoupageId = this.decoupages[0].id;
              }

              this.refreshDecoupage().subscribe(
                (resp) => {
                  observer.next();
                },
                (error) => {
                  observer.next();
                }
              );
            } else {
              this.decoupageId = this.decoupages[0].id;

              this.refreshDecoupage().subscribe(
                (resp) => {
                  observer.next();
                },
                (error) => {
                  observer.next();
                }
              );
            }
          },
          (error) => {
            this.decoupageId = this.decoupages[0].id;

            this.refreshDecoupage().subscribe(
              (resp) => {
                observer.next();
              },
              (error) => {
                observer.next();
              }
            );
          });
      } else {
        observer.next();
      }
    });
  }

  refreshDecoupage(): Observable<any> {
    return new Observable((observer) => {
      if (this.decoupageChooser) {
        this.decoupageService.getOne(this.decoupageId).subscribe((decoupage) => {
          this.model.decoupage = decoupage;
          //  console.log("je suis executé: " + JSON.stringify(this.model.decoupage));
          observer.next();
        },
          (error) => {
            observer.next();
          });
      } else {
        observer.next();
      }
    });
  }

  refreshExpense(): Observable<any> {
    return new Observable((observer) => {
      if (this.expenseChooser) {
        this.expenseService.getOne(this.expenseId).subscribe(
          (expense) => {
            this.model.expense = expense;
            observer.next();
          },
          (error) => {
            observer.next();
          }
        );
      } else {
        observer.next();
      }
    });
  }

  refreshSubjectAttribList(): Observable<any> {
    return new Observable((observer) => {
      if (this.subjectChooser) {
        this.schoolClassSettingService.findSubjectBean(this.schoolClassId).subscribe((resp) => {
          this.schoolClassSettingService.findSubjAttributions(resp, this.yearId).subscribe((respAttrib) => {
            this.subjectAttribs = respAttrib;

            // change current subject or not
            let changeIndex = true;
            for (const attrib of this.subjectAttribs) {
              if (this.subjectId !== undefined) {
                if (attrib.subject.id === this.subjectId) {
                  changeIndex = false;
                }
              }
            }

            if (changeIndex) {
              if (this.subjectAttribs.length > 0) {
                this.subjectId = this.subjectAttribs[0].subject.id;
              }
            }

            observer.next();
          });
        });
      } else {
        observer.next();
      }
    });
  }

  refreshSelectedSubjectAttribInfo(): Observable<any> {
    return new Observable((observer) => {
      if (this.subjectChooser) {
        this.subjectService.getOne(this.subjectId).subscribe((subject) => {
          // subj
          this.model.subject = subject;

          // set charge
          const currentAttrib = this.subjectAttribs.filter(
            attrib => (
              attrib.year.id === this.yearId && attrib.subject.id === this.subjectId
            )
          )[0];

          this.model.charge = currentAttrib !== undefined ? currentAttrib.employee : undefined;

          observer.next();
          console.log("prof charge: " + this.model.charge);
        },
          (error) => {
            observer.next();
          });
      } else {
        observer.next();
      }
    });
  }

  ngOnDestroy(): void {
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    this.updateAll();

    if (this.selectedEvaluationId === undefined) {
      this.model.selectedEvaluationId = 0;
    } else {
      this.model.selectedEvaluationId = this.selectedEvaluationId;
    }

    this.eventEmitter.emit(this.model);
    this.form.close();
  }
}

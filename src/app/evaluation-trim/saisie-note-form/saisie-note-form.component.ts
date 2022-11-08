import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Mark } from "src/app/evaluation-trim/models/mark";
import { EvaluationSetting } from "../models/evaluation-setting";
import { ClassChooserModel } from "../../establishment/models/class-chooser-model";
import { EmployeeIdentityBean } from "../../employees-mg/models/employee-identity-bean";
import { SchoolClassChooserFormComponent } from "../../establishment/school-class-chooser-form/class-chooser-form.component";
import { StudentEvaluationService } from "../services/student-evaluation.service";
import { EvaluationService } from "../services/evaluation.service";
import { Evaluation } from "../models/evaluation";
import { StudentCursusService } from "src/app/student-mg/services/student-cursus.service";
import { StudentIdentityService } from "src/app/student-mg/services/student-identity.service";
import { StudentIdentityBean } from "src/app/student-mg/models/studentIdentityBean";
import { StudentMarkBean } from "src/app/evaluation-trim/models/student-mark-bean";
import { MessageService } from "src/app/utilities/services/message.service";

@Component({
  selector: "app-saisie-note-form",
  templateUrl: "./saisie-note-form.component.html",
  styleUrls: ["./saisie-note-form.component.scss"],
})
export class SaisieNoteFormComponent implements OnInit {
  chooserModel: ClassChooserModel;
  studentIdenditiesList: StudentIdentityBean[] = [];
  markBeanList: StudentMarkBean[] = [];
  markForm: FormGroup;

  // express
  express = false;

  //note fields
  showNote1 = true; showNote2 = true; showNote3 = true; showNote4 = true;

  enableNote1 = true; enableNote2 = true; enableNote3 = true; enableNote4 = true;

  // evaluations
  currentEvalSetting: EvaluationSetting;
  eval1: Evaluation; eval2: Evaluation; eval3: Evaluation; eval4: Evaluation;

  // enseignant
  chargeName = "";

  // decoupage
  decoupage = 1;

  isFirst = true;
  isLast = false;

  //student
  currentStudent: StudentIdentityBean;
  currentMarkBean: StudentMarkBean;

  studentIndex = 0;
  total = 0;

  //view child
  @ViewChild("firstNote", { static: false })
  firstNote: ElementRef;
  @ViewChild("secondNote", { static: false })
  secondNote: ElementRef;
  @ViewChild("thirdNote", { static: false })
  thirdNote: ElementRef;
  @ViewChild("fourthNote", { static: false })
  fourthNote: ElementRef;

  noteMax = 20;
  evaluations: Evaluation[] = [];
  evaluationId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<SchoolClassChooserFormComponent>,
    private studentCursusService: StudentCursusService,
    private studentIdentityService: StudentIdentityService,
    private evaluationService: EvaluationService,
    public studentEvaluationService: StudentEvaluationService,
    public messageService: MessageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.chooserModel = this.data.chooserModel;
    this.express = this.data.express;

    this.chargeName =
      this.chooserModel.charge != undefined
        ? this.define(this.chooserModel.charge)
        : "";

    // in case of express
    this.evaluationService.findEvaluationOfThisTrimestre(this.chooserModel.decoupage.id, this.chooserModel.year.id).subscribe({
      next: (resp) => {
        this.evaluations = resp;

        this.evaluationService
          .findEvaluationSettings(this.chooserModel.schoolClass.id, this.chooserModel.year.id)
          .subscribe((evalSetting) => {
            this.currentEvalSetting = evalSetting;

            //refresh setting
            if (this.express) {
              this.updateEvaluation();

            } else {
              if (this.chooserModel.decoupage.index === 3) {
                this.eval1 = this.currentEvalSetting.eval31;
                this.eval2 = this.currentEvalSetting.eval32;
                this.eval3 = this.currentEvalSetting.eval33;
                this.eval4 = this.currentEvalSetting.eval34;
              } else if (this.chooserModel.decoupage.index === 2) {
                this.eval1 = this.currentEvalSetting.eval21;
                this.eval2 = this.currentEvalSetting.eval22;
                this.eval3 = this.currentEvalSetting.eval23;
                this.eval4 = this.currentEvalSetting.eval24;
              } else {
                this.eval1 = this.currentEvalSetting.eval11;
                this.eval2 = this.currentEvalSetting.eval12;
                this.eval3 = this.currentEvalSetting.eval13;
                this.eval4 = this.currentEvalSetting.eval14;
              }
            }


            // field to be shown
            this.showNote1 = this.eval1 ? true : false;
            this.showNote2 = (this.eval2 && !this.express) ? true : false;
            this.showNote3 = (this.eval3 && !this.express) ? true : false;
            this.showNote4 = (this.eval4 && !this.express) ? true : false;

            // **********************************************************************

            this.studentCursusService
              .getAllByClass(
                this.chooserModel.schoolClass.id,
                this.chooserModel.year.id
              )
              .subscribe((cursList) => {
                this.total = cursList.length;

                //get student identities
                this.studentIdentityService
                  .getStudentIdentities(cursList)
                  .subscribe((idsList) => {
                    this.studentIdenditiesList = idsList;

                    this.studentEvaluationService
                      .findAllByClass(cursList)
                      .subscribe((mlist) => {
                        //console.log("map:::::" + JSON.stringify(map));
                        this.markBeanList = mlist;

                        this.setCurrentStudent(this.studentIndex);
                        this.onFocusFirst();
                      });
                  });
              });
          });
      }
    });
  }

  updateEvaluation() {
    if (this.evaluationId === undefined) {
      this.evaluationId = this.evaluations[0].id;
    }
    this.eval1 = this.evaluations.filter(item => item.id === this.evaluationId)[0];

    this.setCurrentStudent(0);
  }

  initForm() {
    this.markForm = this.formBuilder.group({
      note1: new FormControl("", [Validators.max(this.noteMax)]),
      note2: new FormControl("", [Validators.max(this.noteMax)]),
      note3: new FormControl("", [Validators.max(this.noteMax)]),
      note4: new FormControl("", [Validators.max(this.noteMax)]),
    });
  }

  onNoClick(): void {
    this.form.close();
  }

  setCurrentStudent(studentIndex: number) {
    if (studentIndex === 0) {
      this.isFirst = true;
      this.isLast = false;
    } else if (studentIndex === this.total - 1) {
      this.isLast = true;
      this.isFirst = false;
    } else {
      this.isFirst = false;
      this.isLast = false;
    }

    this.currentStudent = this.studentIdenditiesList[studentIndex];

    this.currentMarkBean = this.markBeanList.filter(
      (item) => item.id === this.currentStudent.id
    )[0];

    // console.log(JSON.stringify(this.currentMarkBean.marks));

    //update marks
    if (this.eval1 !== null) {
      this.studentEvaluationService
        .findMark(
          this.eval1.id,
          this.chooserModel.subject.id,
          this.currentMarkBean
        )
        .subscribe((resp) => {
          // console.log('note 1 finded !!!!!!: ' + resp);
          this.markForm.patchValue({ note1: resp });
        });
    }

    if (this.eval2 !== null && !this.express) {
      this.studentEvaluationService
        .findMark(
          this.eval2.id,
          this.chooserModel.subject.id,
          this.currentMarkBean
        )
        .subscribe((resp) => {
          //  console.log('note 2 finded !!!!!!: ' + resp);
          this.markForm.patchValue({ note2: resp });
        });
    }

    if (this.eval3 !== null && !this.express) {
      this.studentEvaluationService
        .findMark(
          this.eval3.id,
          this.chooserModel.subject.id,
          this.currentMarkBean
        )
        .subscribe((resp) => {
          //  console.log('note 3 finded !!!!!!: ' + resp);
          this.markForm.patchValue({ note3: resp });
        });
    }

    if (this.eval4 !== null && !this.express) {
      this.studentEvaluationService
        .findMark(
          this.eval4.id,
          this.chooserModel.subject.id,
          this.currentMarkBean
        )
        .subscribe((resp) => {
          // console.log('note 4 finded !!!!!!: ' + resp);
          this.markForm.patchValue({ note4: resp });
        });
    }
  }

  onEvaluationChange() {
    this.updateEvaluation();
  }

  next() {
    this.studentIndex++;
    this.setCurrentStudent(this.studentIndex);
  }

  previous() {
    this.studentIndex--;
    this.setCurrentStudent(this.studentIndex);
  }

  toLast() {
    this.studentIndex = this.total - 1;
    this.setCurrentStudent(this.studentIndex);
  }

  toFirst() {
    this.studentIndex = 0;
    this.setCurrentStudent(this.studentIndex);
  }

  onSubmit(): void {
    const stagedStudent = this.currentMarkBean;

    //list mark
    const tempListMarks: Mark[] = [];
    tempListMarks.push(
      new Mark(
        this.eval1,
        this.chooserModel.subject,
        this.markForm.value["note1"]
      )
    );

    if (!this.express) {
      tempListMarks.push(
        new Mark(
          this.eval2,
          this.chooserModel.subject,
          this.markForm.value["note2"]
        )
      );

      tempListMarks.push(
        new Mark(
          this.eval3,
          this.chooserModel.subject,
          this.markForm.value["note3"]
        )
      );

      tempListMarks.push(
        new Mark(
          this.eval4,
          this.chooserModel.subject,
          this.markForm.value["note4"]
        )
      );
    }

    // this to remove eventual old value of marks
    const stagedListMarks = stagedStudent.marks.filter((item) => {
      for (const mark of tempListMarks) {
        if (mark.evaluation !== null && mark.subject !== null) {
          if (item.evaluation !== null && item.subject !== null) {
            if (mark.evaluation.id === item.evaluation.id && mark.subject.id === item.subject.id) {
              return false;
            }
          } else {
            return false;
          }
        }
      }
      return true;
    });

    // then this to push new marks
    for (const mark of tempListMarks) {
      if (mark.evaluation !== null) {
        stagedListMarks.push(mark);
      }
    }

    // set new marks list to this student
    this.currentMarkBean.marks = stagedListMarks;

    this.studentEvaluationService
      .saveMark(this.currentMarkBean)
      .subscribe((resp) => {
        //update index
        if (this.studentIndex < this.total - 1) {
          this.studentIndex++;
          //on rafraichi les données
          this.setCurrentStudent(this.studentIndex);
        } else {
          this.messageService.showAlertMessage("Terminé!");
        }

        this.onFocusFirst();
        this.updateMarks(resp);
      });
  }

  updateMarks(student: StudentMarkBean) {
    let tempList = this.markBeanList.filter((item) => item.id !== student.id);
    tempList.push(student);
    this.markBeanList = tempList;
  }

  //focus first
  onFocusFirst() {
    if (this.showNote1) {
      if (this.firstNote !== undefined) {
        if (this.firstNote.nativeElement !== undefined) {
          this.firstNote.nativeElement.focus();
          this.firstNote.nativeElement.select();
        }
      }
    } else if (this.showNote2) {
      if (this.secondNote !== undefined) {
        if (this.secondNote.nativeElement !== undefined) {
          this.secondNote.nativeElement.focus();
          this.secondNote.nativeElement.select();
        }
      }
    } else if (this.showNote3) {
      if (this.thirdNote !== undefined) {
        if (this.thirdNote.nativeElement !== undefined) {
          this.thirdNote.nativeElement.focus();
          this.thirdNote.nativeElement.select();
        }
      }
    } else if (this.showNote4) {
      if (this.fourthNote !== undefined) {
        if (this.fourthNote.nativeElement !== undefined) {
          this.fourthNote.nativeElement.select();
          this.fourthNote.nativeElement.focus();
        }
      }
    }
  }

  sleep(ms: number) {
    return new Promise((resolve) => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }

  define(charge: EmployeeIdentityBean): string {
    let name = "";
    if (charge.identity) {
      if (charge.identity.lastName && charge.identity.firstName) {
        name = charge.identity.lastName + " " + charge.identity.firstName;
      } else if (charge.identity.lastName) {
        name = charge.identity.lastName;
      } else if (charge.identity.firstName) {
        name = charge.identity.firstName;
      }
    }
    return name;
  }
}

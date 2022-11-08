import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { ClassChooserModel } from "src/app/establishment/models/class-chooser-model";
import { SchoolClassIdentityBean } from "src/app/establishment/models/school-class-identity-bean";
import { StudentIdentityBean } from "src/app/student-mg/models/studentIdentityBean";
import { StudentCursus } from "src/app/student-mg/models/student-cursus";
import { Year } from "src/app/establishment/models/year";
import { SchoolClassIdentityService } from "src/app/establishment/services/school-class-identity.service";
import { ConstanceService } from "src/app/utilities/services/constance.service";
import { ConfirmDeleteComponent } from "../../utilities/confirm-delete/confirm-delete.component";
import { FileChooserComponent } from "../../utilities/file-chooser/file-chooser.component";
import { SchoolClassChooserFormComponent } from "../../establishment/school-class-chooser-form/class-chooser-form.component";
import { StudentFormComponent } from "../student-form/student-form.component";
import { ActionService } from "src/app/utilities/services/action.service";
import { FileService } from "src/app/utilities/services/file.service";
import { ProgressService } from "src/app/utilities/services/progress.service";
import { StudentIdentityService } from "../services/student-identity.service";
import { StudentCursusBean } from "../models/studentCursusBean";
import { StudentListModel } from "../models/student-list-model";
import { StudentListService } from "../services/student-list.service";
import { StudentCursusService } from "../services/student-cursus.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService } from "src/app/utilities/services/message.service";
import { AuthService } from "src/app/utilities/services/auth.service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.scss"],

  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class StudentListComponent implements OnInit, OnDestroy {
  expandedElement: StudentIdentityBean | null;
  currentSchoolClassId = 0;
  displayedColumns = [
    "num",
    "nom",
    "prenom",
    "sex",
    "modify",
    "suppr",
    "select",
  ];

  filterText: string;
  filteredStudents: StudentListModel[] = [];
  filteredCursuses: StudentCursusBean[] = [];
  filteredIdentities: StudentIdentityBean[] = [];
  holeList: StudentIdentityBean[] = [];

  classes: SchoolClassIdentityBean[] = [];
  currentYear: Year;
  public showActions = false;
  public filterControl = new FormControl();

  // for checkbox in the table
  selection = new SelectionModel<StudentListModel>(true, []);

  constructor(
    public auth: AuthService,
    private messageService: MessageService,
    public dialog: MatDialog,
    public actionService: ActionService,
    public progressService: ProgressService,
    public studentCursusService: StudentCursusService,
    public studentIdentityService: StudentIdentityService,
    public schoolClassService: SchoolClassIdentityService,
    public studentListService: StudentListService,
    public constanceService: ConstanceService,
    public fileService: FileService
  ) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.schoolClassService.getAll().subscribe((resp) => {
        this.classes = resp;
        this.currentSchoolClassId = this.classes[0].id;
        this.refresh();
      });
    });

    this.selection.changed.subscribe(() => {
      if (this.selection.selected.length > 1) {
        this.showActions = true;
      } else {
        this.showActions = false;
      }
    });
  }

  ngOnDestroy(): void { }

  refresh() {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);

      this.getList(this.currentSchoolClassId, this.currentYear.id).subscribe(
        (respCurs) => {
          this.filteredCursuses = respCurs;
          // console.log("cursuses: >>>> " + JSON.stringify(respCurs));

          this.studentIdentityService.getStudentIdentities(respCurs).subscribe(
            (respIds) => {
              this.holeList = respIds;
              this.filteredIdentities = respIds;

              this.setListObjs();

              this.filter();
              this.actionService.stopWaiting(progressId);
            },

            (error) => {
              console.log("error");
              this.actionService.stopWaiting(progressId);
            }
          );
        }
      );
    });
  }

  setListObjs() {
    const tempStudents = [];
    for (const student of this.filteredIdentities) {
      const studentListModel = new StudentListModel();
      studentListModel.id = student.id;
      studentListModel.lastName = student.identity.lastName;
      studentListModel.firstName = student.identity.firstName;
      studentListModel.sex = student.identity.sex;
      studentListModel.numMatricule = student.inscriptionInfo.numMatricule;
      studentListModel.entryDate = student.inscriptionInfo.entryDate;
      studentListModel.cursuses = this.studentListService.findCursuses(
        this.filteredCursuses,
        student.id
      );

      tempStudents.push(studentListModel);
    }

    this.filteredStudents = tempStudents;
  }

  getList(
    schoolClassId: number,
    yearId: number
  ): Observable<StudentCursusBean[]> {
    if (schoolClassId === 0) {
      return this.studentCursusService.getAllByYear(yearId);
    } else {
      return this.studentCursusService.getAllByClass(schoolClassId, yearId);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredIdentities.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    } else {
      this.selection.select(...this.filteredStudents);
    }
  }

  /** The label for the checkbox on the passed row */
  masterCheckboxLabel(): string {
    const option = this.isAllSelected() ? "select" : "deselect";
    return option + " all";
  }

  /** The label for the checkbox  */
  checkboxLabel(row: StudentListModel, index: number): string {
    const option = this.selection.isSelected(row) ? "deselect" : "select";
    return option + " row " + (index + 1);
  }

  onDelete(obj: StudentListModel) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "600px",
      data: {
        titre:
          "Voulez- vous vraiment supprimer: " +
          obj.lastName +
          " " +
          obj.firstName,
      },
    });
    dialogRef.componentInstance.event.subscribe((response) => {
      this.studentIdentityService.delete(obj.id).subscribe(
        (resp) => {
          console.log("deleted: " + obj);
          this.refresh();
        },
        (error: HttpErrorResponse) => {
          this.messageService.showErrorMessage(error.error.message);
        }
      );
    });
  }

  onDeleteCursus(student: StudentListModel, cursus: StudentCursus) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "1000px",
      data: {
        titre:
          "Voulez- vous vraiment supprimer: " +
          cursus.schoolClass.designation +
          " - " +
          cursus.year.designation +
          " pour l'élève: " +
          student.lastName +
          " " +
          student.firstName,
      },
    });

    dialogRef.componentInstance.event.subscribe((response) => {
      this.studentCursusService
        .deleteCursus(student.id, cursus.year.id)
        .subscribe((resp) => {
          console.log("done!!");
          this.refresh();
        });
    });
  }

  getParsedList(list: StudentCursus[]): StudentCursus[] {
    let temp = [];
    for (const curs of list) {
      let exist = false;
      for (const old of temp) {
        if (curs.year.id === old.year.id) {
          exist = true;
        }
      }

      if (exist === false) {
        temp.push(curs);
      }
    }

    return temp;
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: "1000px",
      data: {
        titre: "Nouveau élève",
        currentSchoolClassId: this.currentSchoolClassId,
      },
    });

    dialogRef.componentInstance.event.subscribe((response) => {
      this.refresh();
    });
  }

  onModify(student: StudentListModel): void {
    const studentIdBean = this.studentIdentityService.getIdentityBean(
      this.holeList,
      student.id
    );
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: "1000px",
      data: {
        titre: "Modifier (" + student.lastName + " " + student.firstName + ")",
        obj: studentIdBean,
      },
    });

    dialogRef.componentInstance.event.subscribe((response) => {
      this.refresh();
    });
  }

  // filter for test autocomplete
  filter() {
    if (this.filterText !== undefined) {
      const filterValue = this.filterText.toLowerCase();
      this.filteredIdentities = this.holeList.filter((option) =>
        (option.identity.lastName + " " + option.identity.firstName)
          .toLowerCase()
          .includes(filterValue)
      );

      this.setListObjs();
    }
  }

  onExcel(): void {
    // I ask for choosing the schoolclass
    const dialogRef1 = this.dialog.open(SchoolClassChooserFormComponent, {
      width: "600px",
      data: { titre: "Choisir la classe" },
    });

    dialogRef1.componentInstance.eventEmitter.subscribe(
      (chooser: ClassChooserModel) => {
        // I now ask for choosing the file to exported
        const dialogRef2 = this.dialog.open(FileChooserComponent, {
          width: "600px",
          data: {
            titre: "Importer une liste d'élève",
            obj: new StudentIdentityBean(),
          },
        });

        dialogRef2.componentInstance.event.subscribe((file: File) => {
          if (file) {
            this.actionService
              .launchAction(
                this.studentCursusService.importExcel(chooser, file)
              )
              .subscribe(
                (resp) => {
                  this.currentSchoolClassId = chooser.schoolClass.id;
                  this.refresh();
                },
                (error) => {
                  console.log("error: >>> " + error.console.error);
                  this.refresh();
                }
              );
          }
        });
      }
    );
  }

  moveTo(): void {
    const dialogRef2 = this.dialog.open(SchoolClassChooserFormComponent, {
      width: "600px",
      data: { titre: "Choisir la nouvelle classe", yearChooser: true, disableYearSelection: false },
    });

    dialogRef2.componentInstance.eventEmitter.subscribe(
      (resp: ClassChooserModel) => {
        const stagged = this.holeList.filter(
          (item) =>
            this.selection.selected.filter((test) => item.id === test.id)
              .length > 0 //item in the selected list
        );

        for (const st of stagged) {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            this.actionService.launchWaiting(progressId);
            this.studentCursusService
              .save(st, resp.schoolClass, resp.year, 0)
              .subscribe((resp) => {
                this.actionService.stopWaiting(progressId);
                this.refresh();
              });
          });
        }
      }
    );
  }

  onDeleteAll(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "600px",
      data: {
        titre:
          "Voulez- vous vraiment supprimer tous ces élèves de cette classe? ",
      },
    });

    dialogRef.componentInstance.event.subscribe((response) => {
      console.log("element to be delete: " + this.selection.selected.length);
      const stagged = this.holeList.filter(
        (item) =>
          this.selection.selected.filter((test) => item.id === test.id).length >
          0
      );

      this.progressService.getNewProgressId().subscribe((progressId) => {
        this.actionService.launchWaiting(progressId);
        this.studentCursusService
          .deleteAllCursus(stagged, this.currentYear.id)
          .subscribe((resp) => {
            this.refresh();
            this.actionService.stopWaiting(progressId);
          });
      });
    });
  }

  setAsRedoublantAll() {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "600px",
      data: {
        titre:
          "Voulez- vous vraiment définir tous ces élèves comme redoublant? ",
      },
    });

    dialogRef.componentInstance.event.subscribe((response) => {
      const stagged = this.holeList.filter(
        (item) =>
          this.selection.selected.filter((test) => item.id === test.id).length >
          0
      );

      this.progressService.getNewProgressId().subscribe((progressId) => {
        this.actionService.launchWaiting(progressId);
        this.studentCursusService
          .setAsRedoublantAll(stagged, this.currentYear.id)
          .subscribe((resp) => {
            this.refresh();
            this.actionService.stopWaiting(progressId);
            this.messageService.showSucces();
          });
      });
    });
  }
}

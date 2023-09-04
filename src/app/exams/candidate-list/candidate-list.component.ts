import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudentIdentityBean } from 'src/app/student-mg/models/studentIdentityBean';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { FileChooserComponent } from 'src/app/utilities/file-chooser/file-chooser.component';
import { ActionService } from 'src/app/utilities/services/action.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { CandidateFormComponent } from '../candidate-form/candidate-form.component';
import { ExamChooserComponent } from '../exam-chooser/exam-chooser.component';
import { CandidateIdentityBean } from '../models/candidate-identity-bean';
import { ExamChooserModel } from '../models/exam-chooser-model';
import { ExamIdentityBean } from '../models/exam-identity-bean';
import { CandidateIdentityService } from '../services/candidate-identity.service';
import { ProgressService } from 'src/app/utilities/services/progress.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],

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
export class CandidateListComponent implements OnInit {
  expandedElement: StudentIdentityBean | null;
  currentExamIdentityBean: ExamIdentityBean;

  displayedColumns = [
    "num_ord", "num_table",
    "nom",
    "prenom",
    "sex", "establishment",
    "modify",
    "suppr",
    "select",
  ];

  filterText: string;
  filteredCandidateIdentityBean: CandidateIdentityBean[] = [];
  holeList: CandidateIdentityBean[] = [];
  public showActions = false;
  public filterControl = new FormControl();

  // for checkbox in the table
  selection = new SelectionModel<CandidateIdentityBean>(true, []);

  constructor(
    public auth: AuthService, public router: Router, private location: Location,
    private messageService: MessageService,
    private dialog: MatDialog,
    private actionService: ActionService, private progressService: ProgressService,
    private candidateIdentityService: CandidateIdentityService
  ) { }

  ngOnInit() {
    const data: any = this.location.getState();
    const chooserModel: ExamChooserModel = data.chooserModel; //["chooserModel"];

    this.currentExamIdentityBean = chooserModel.exam;

    if (this.currentExamIdentityBean == undefined) {
      this.setExamBefore();
    }

    this.setList();

    this.selection.changed.subscribe(() => {
      if (this.selection.selected.length > 1) {
        this.showActions = true;
      } else {
        this.showActions = false;
      }
    });
  }

  setList() {
    this.candidateIdentityService.getAll(this.currentExamIdentityBean.id).subscribe((resp) => {
      this.filteredCandidateIdentityBean = resp;
      this.holeList = resp;
      this.filter();
    });
  }

  ngOnDestroy(): void { }

  setExamBefore() {
    const chooserData = { titre: 'Choisir un examen' };

    const dialogRef = this.dialog.open(ExamChooserComponent, {
      width: '600px',
      data: chooserData
    });

    dialogRef.componentInstance.eventEmitter.subscribe(
      (resp) => {
        this.currentExamIdentityBean = resp;
        this.refresh();
      }
    );
  }

  refresh() {
    this.setList();
  }

  onDelete(obj: CandidateIdentityBean) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "600px",
      data: {
        titre:
          "Voulez- vous vraiment supprimer: " + obj.identity.lastName + " " + obj.identity.firstName
      },
    });

    dialogRef.componentInstance.event.subscribe((response) => {
      this.candidateIdentityService.delete(obj.id).subscribe({
        next: (resp) => {
          console.log("deleted: " + obj);
          this.refresh();
        }, error: (error: HttpErrorResponse) => {
          this.messageService.showErrorMessage("Erreur:" + error && error.error.message);
        }
      }
      );
    });
  }

  onDeleteAll(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: "600px",
      data: {
        titre:
          "Voulez- vous vraiment supprimer tous ces candidats de cette classe? ",
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
        stagged.map(item => {
          this.actionService.launchWaiting(progressId);

          this.candidateIdentityService
            .delete(item.id)
            .subscribe((resp) => {
              this.actionService.stopWaiting(progressId);
              this.refresh();
            });
        });

      });
    });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(CandidateFormComponent, {
      width: "600px",
      data: {
        titre: "Nouveau candidat",
        exam: this.currentExamIdentityBean,
      },
    });

    dialogRef.componentInstance.event.subscribe((response) => {
      this.refresh();
    });
  }

  onModify(candidateIdentityBean: CandidateIdentityBean): void {
    const dialogRef = this.dialog.open(CandidateFormComponent, {
      width: "600px",
      data: {
        titre: "Modifier (" + candidateIdentityBean.identity.lastName + " " + candidateIdentityBean.identity.firstName + ")",
        candidate: candidateIdentityBean,
        exam: this.currentExamIdentityBean
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
      this.filteredCandidateIdentityBean = this.holeList.filter((option) =>
        (option.identity.lastName + " " + option.identity.firstName)
          .toLowerCase()
          .includes(filterValue)
      );
    }
  }

  onExcel(): void {
    // I ask for choosing the schoolclass
    const dialogRef1 = this.dialog.open(ExamChooserComponent, {
      width: "600px",
      data: { titre: "Choisir l'établissement", isEstablishmentChooser: true, isExamChooser: false },
    });

    dialogRef1.componentInstance.eventEmitter.subscribe(
      (chooser: ExamChooserModel) => {
        // I now ask for choosing the file to exported
        const dialogRef2 = this.dialog.open(FileChooserComponent, {
          width: "600px",
          data: {
            titre: "Importer une liste de excel",
            obj: new StudentIdentityBean(),
          },
        });

        dialogRef2.componentInstance.event.subscribe((file: File) => {
          if (file) {
            this.actionService
              .launchAction(
                this.candidateIdentityService.importExcel(this.currentExamIdentityBean, chooser.establishment, file)
              ).subscribe(
                (resp) => {
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredCandidateIdentityBean.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    } else {
      this.selection.select(...this.filteredCandidateIdentityBean);
    }
  }

  /** The label for the checkbox on the passed row */
  masterCheckboxLabel(): string {
    const option = this.isAllSelected() ? "select" : "deselect";
    return option + " all";
  }

  /** The label for the checkbox  */
  checkboxLabel(row: CandidateIdentityBean, index: number): string {
    const option = this.selection.isSelected(row) ? "deselect" : "select";
    return option + " row " + (index + 1);
  }
}

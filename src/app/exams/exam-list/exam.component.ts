import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { ExamFormComponent } from '../exam-form/exam-form.component';
import { ExamIdentityBean } from '../models/exam-identity-bean';
import { ExamIdentityService } from '../services/exam-identity.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExamComponent implements OnInit {
  expandedElement: ExamIdentityBean | null;
  displayedColumns = [
    'num',
    'designation',
    'modify',
    'suppr', 'setting'
  ];

  filterText: string;
  filteredList: ExamIdentityBean[] = [];
  holeList: ExamIdentityBean[] = [];

  constructor(
    public auth: AuthService, private messageService: MessageService,
    public dialog: MatDialog,
    private examService: ExamIdentityService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.examService.getAll().subscribe((resp) => {
      this.holeList = resp;
      this.filteredList = resp;
    })
  }

  onDelete(obj: ExamIdentityBean) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.examService.delete(obj.id).subscribe(
        resp => {
          console.log('deleted: ' + obj);
          this.refresh();
        },
        error => {
          this.messageService.showErrorMessage(error.error.message);
        }
      );
    });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(ExamFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un établissement', obj: new ExamIdentityBean() }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onModify(currentObj: ExamIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(ExamFormComponent, {
      width: '600px',
      data: { titre: 'Modifier: ' + data.designation, obj: data }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onSetting(currentObj: ExamIdentityBean): void {
    const data = Object.assign({}, currentObj);

    const dialogRef = this.dialog.open(ExamFormComponent, {
      width: '1000px',
      data: { titre: 'Configuration: ' + data.designation, obj: data, isSetting: true }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  // filter for test autocomplete
  filter() {
    if (typeof this.filterText !== undefined) {
      const filterValue = this.filterText.toLowerCase();
      this.filteredList = this.holeList.filter(option =>
        (option.designation).toLowerCase().includes(filterValue)
      );
    }
  }
}

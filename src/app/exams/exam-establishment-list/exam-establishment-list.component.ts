import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { MessageService } from 'src/app/utilities/services/message.service';
import { ExamEstablishmentFormComponent } from '../exam-establishment-form/exam-establishment-form.component';
import { EstablishmentExamIdentityBean } from '../models/exam-establishment-identity-bean';
import { EstablishmentExamIdentityService } from '../services/establishment-exam-identity.service';

@Component({
  selector: 'app-exam-establishment-list',
  templateUrl: './exam-establishment-list.component.html',
  styleUrls: ['./exam-establishment-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExamEstablishmentListComponent implements OnInit {
  expandedElement: EstablishmentExamIdentityBean | null;
  displayedColumns = [
    'num',
    'designation', 'adress', 'tel',
    'modify',
    'suppr', //'setting'
  ];

  filterText: string;
  filteredList: EstablishmentExamIdentityBean[] = [];
  holeList: EstablishmentExamIdentityBean[] = [];

  constructor(
    public auth: AuthService, private messageService: MessageService,
    public dialog: MatDialog,
    private establishmentExamService: EstablishmentExamIdentityService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.establishmentExamService.getAll().subscribe((resp) => {
      this.holeList = resp;
      this.filteredList = resp;
    })
  }

  onDelete(obj: EstablishmentExamIdentityBean) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.establishmentExamService.delete(obj.id).subscribe(
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
    const dialogRef = this.dialog.open(ExamEstablishmentFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un établissement', obj: new EstablishmentExamIdentityBean() }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onModify(currentObj: EstablishmentExamIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(ExamEstablishmentFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
    });

    dialogRef.componentInstance.event.subscribe(
      response => {
        this.refresh();
      }
    );
  }

  onSetting(currentObj: EstablishmentExamIdentityBean): void {
    const data = Object.assign({}, currentObj);

    const dialogRef = this.dialog.open(ExamEstablishmentFormComponent, {
      width: '1000px',
      data: { titre: 'Configuration', obj: data, isSetting: true }
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

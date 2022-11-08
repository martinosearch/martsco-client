import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Year as ExamNational } from 'src/app/establishment/models/year';
import { YearFormComponent } from 'src/app/establishment/year-form/year-form.component';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { ExamNationalFormComponent } from '../exam-national-form/exam-national-form.component';
import { ExamNationalService } from '../services/exam-national.service';

@Component({
  selector: 'app-exam-national-list',
  templateUrl: './exam-national-list.component.html',
  styleUrls: ['./exam-national-list.component.scss']
})
export class ExamNationalListComponent implements OnInit {
  displayedColumns = [
    'num',
    'designation',
    'modify',
    'suppr'
  ];

  holeList: ExamNational[] = [];
  filteredList: ExamNational[] = [];
  filterText: String;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: ExamNationalService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.dataService.getAll().subscribe((resp) => {
      this.holeList = resp;
      this.filter();
    });
  }

  onDelete(obj: ExamNational) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.designation }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.dataService.delete(obj.id).subscribe(resp => {
        console.log('deleted: ' + obj);
        this.refresh();
      });
      this.refresh();
    });
  }

  onModify(currentObj: ExamNational): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(ExamNationalFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.dataService.save(response).subscribe(response2 => {
          console.log('saved: ' + response2.designation);
          this.refresh();
          validationSub.unsubscribe();
        });
      }
    );
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(YearFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un examen', obj: new ExamNational() }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.dataService.save(response).subscribe(response2 => {
          console.log('saved: ' + response2.designation);
          this.refresh();
        });
      }
    );
  }

  filter() {
    if (this.filterText !== undefined) {
      const filterValue = this.filterText.toLowerCase();

      this.filteredList = this.holeList.filter(value =>
        (value.designation).toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredList = this.holeList;
    }
  }

}

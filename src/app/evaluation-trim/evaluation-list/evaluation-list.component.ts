import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { EvaluationFormComponent } from '../evaluation-form/evaluation-form.component';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { Year } from 'src/app/establishment/models/year';
import { EvaluationService } from '../services/evaluation.service';
import { Evaluation } from '../models/evaluation';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss']
})
export class EvaluationListComponent implements OnInit, OnDestroy {
  displayedColumns = ['num', 'designation', 'type', 'decoupage', 'annee', 'modify', 'suppr'];
  filterText: string;
  filteredList = [];
  evaluations = [];
  list: Evaluation[] = [];
  currentYear: Year;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog, public constanceService: ConstanceService,
    public dataService: EvaluationService,
  ) { }

  ngOnInit() {
    this.constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
      this.refresh();
    });
  }

  ngOnDestroy(): void { }

  refresh() {
    this.dataService.getAll().subscribe((resp) => {
      this.list = resp.filter((elmt: Evaluation) => (elmt.year.id === this.currentYear.id));
      this.filteredList = this.list;
    });
  }

  onDelete(obj: Evaluation) {
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

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(EvaluationFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter une évaluation', obj: new Evaluation() }
    });

    dialogRef.componentInstance.event.subscribe(() => this.refresh());
  }

  onModify(currentObj: Evaluation): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(EvaluationFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
    });

    dialogRef.componentInstance.event.subscribe(() => this.refresh());
  }


  // filter for test autocomplete
  filter() {
    if (typeof this.filterText !== undefined) {
      const filterValue = this.filterText.toLowerCase();
      this.filteredList = this.evaluations.filter(option =>
        (option.designation).toLowerCase().includes(filterValue)
      );
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Decoupage } from '../../establishment/models/decoupage';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { DecoupageFormComponent } from '../decoupage-form/decoupage-form.component';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { DecoupageService } from '../services/decoupage.service';

@Component({
  selector: 'app-decoupage-list',
  templateUrl: './decoupage-list.component.html',
  styleUrls: ['./decoupage-list.component.scss']
})
export class DecoupageListComponent implements OnInit, OnDestroy {
  displayedColumns = ['num', 'designation', 'index', 'modify', 'suppr'];
  liste: Decoupage[] = [];

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: DecoupageService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.dataService.getAll().subscribe((resp) => {
      this.liste = resp;
    });
  }

  onDelete(obj: Decoupage) {
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

  onModify(currentObj: Decoupage): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(DecoupageFormComponent, {
      width: '600px',
      data: { titre: 'Modifier', obj: data }
    });

    const validationSub = dialogRef.componentInstance.event.subscribe(
      response => {
        this.dataService.save(response).subscribe(response2 => {
          console.log('saved: ' + response2.designation);
          this.dataService.setCurrentObject(response2);
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
    const dialogRef = this.dialog.open(DecoupageFormComponent, {
      width: '600px',
      data: { titre: 'Ajouter un découpage', obj: new Decoupage() }
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
}

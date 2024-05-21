import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryIdentityBean } from 'src/app/governement-informations/models/country-identity-bean';
import { CountryService } from 'src/app/governement-informations/services/country.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { ConfirmDeleteComponent } from '../../utilities/confirm-delete/confirm-delete.component';
import { CountryFormComponent } from '../country-form/country-form.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CountryListComponent implements OnInit {
  expandedElement: CountryIdentityBean | null;
  displayedColumns = ['num', 'name', 'devise', 'modify', 'suppr'];

  filterText: string;
  filteredList: CountryIdentityBean[] = [];
  holeList: CountryIdentityBean[] = [];

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: CountryService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void { }

  refresh() {
    this.dataService.getAll().subscribe((resp) => {
      this.holeList = resp;
      this.filteredList = resp;
    })
  }

  onDelete(obj: CountryIdentityBean) {
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
    const dialogRef = this.dialog.open(CountryFormComponent, {
      width: '1000px',
      data: { titre: 'Ajouter un établissement', obj: new CountryIdentityBean() }
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

  onModify(currentObj: CountryIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(CountryFormComponent, {
      width: '1000px',
      data: { titre: 'Modifier', obj: data }
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

  onSetting(currentObj: CountryIdentityBean): void {
    const data = Object.assign({}, currentObj);
    const dialogRef = this.dialog.open(CountryFormComponent, {
      width: '1000px',
      data: { titre: 'Configuration', obj: data, isSetting: true }
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

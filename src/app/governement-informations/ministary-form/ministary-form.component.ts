import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryIdentityBean } from 'src/app/governement-informations/models/country-identity-bean';
import { Ministary } from 'src/app/governement-informations/models/ministary';
import { CountryService } from 'src/app/governement-informations/services/country.service';
import { MinistaryService } from 'src/app/governement-informations/services/ministary.service';

@Component({
  selector: 'app-ministary-form',
  templateUrl: './ministary-form.component.html',
  styleUrls: ['./ministary-form.component.scss']
})
export class MinistaryFormComponent implements OnInit {
  model = new Ministary();
  public event: EventEmitter<any> = new EventEmitter();
  paysId: number;
  listPays: CountryIdentityBean[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public form: MatDialogRef<MinistaryFormComponent>,
    public dataService: MinistaryService, public countryService: CountryService
  ) { }

  ngOnInit() {
    this.countryService.getAll().subscribe(resp => {
      this.listPays = resp;
    });

    this.model = this.data.obj;
    this.paysId = this.model.country !== null ? this.model.country.id : undefined;
  }

  onNoClick(): void {
    this.form.close();
  }

  onSubmit(): void {
    const country = this.listPays.filter(item => item.id === this.paysId)[0];
    if (country != null) {
      this.model.country = country;
    }

    this.event.emit(this.model);
    this.form.close();
  }
}

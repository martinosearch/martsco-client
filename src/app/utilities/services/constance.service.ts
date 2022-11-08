import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, ReplaySubject } from 'rxjs';
import { Year } from 'src/app/establishment/models/year';

import { YearService } from '../../establishment/services/year.service';
import { Menu } from '../models/menu';
import { UtilRouteService } from './util-route.service';

@Injectable({
  providedIn: 'root'
})

export class ConstanceService {
  public serverSubj = new Subject<boolean>();
  public currentYearSubject = new ReplaySubject<Year>();
  public isLoaded = false;
  public currentSection = "MartSCO";

  public etablissement = new Menu(1, "Établissement");
  public evaluations = new Menu(2, "Évaluation");
  public exams = new Menu(3, "Examens");
  public comptabilite = new Menu(4, "Comptabilité");
  public bibliotheque = new Menu(5, "Bibliothèque");
  public planning = new Menu(6, "Planning");
  public cantine = new Menu(7, "Cantine");

  public menus: Menu[] = [this.etablissement, this.evaluations, this.exams,
  this.comptabilite, this.bibliotheque, this.planning, this.cantine];

  public currentMenu = this.etablissement;

  public sexes = [
    { id: 0, intitule: 'Masculin', code: 'M' },
    { id: 1, intitule: 'Féminin', code: 'F' },
    { id: 3, intitule: 'Indéterminé', code: '-' }
  ];

  public typesAssurance = [
    { id: 0, designation: 'Publique' },
  ];

  public storageLocation = sessionStorage;

  constructor(public yearService: YearService, public dialog: MatDialog, public router: Router,
    public utilRouteService: UtilRouteService) {
    this.onInit();
  }

  onInit() {
    this.yearService.getAll().subscribe(rsp => {
      if (rsp.length > 0) {
        this.currentYearSubject.next(rsp[0]);
      }

      this.isLoaded = true;

      const idStored = Number(this.storageLocation.getItem("id_menu"));

      this.currentMenu = this.menus.filter((menu) => (menu.id === idStored))[0];
      if (this.currentMenu === undefined) { this.currentMenu = this.etablissement; }
    });
  }

  refreshYearById(yearId: number) {
    this.yearService.getOne(yearId).subscribe(resp => {
      this.currentYearSubject.next(resp);
    });

    // this.yearService.setCurrentToServer(yearId).subscribe((resp) => {
    //   console.log("current year is set");
    // });
  }

  setMenu(menu: Menu) {
    this.currentMenu = menu;
    this.toAccueil();
    this.storageLocation.setItem("id_menu", this.currentMenu.id.toString());
  }

  setCurrentSection(str: string) {
    this.currentSection = "MartSCO / " + str;
  }

  toAccueil() {
    this.router.navigate([this.utilRouteService.accueil]);
  }

}

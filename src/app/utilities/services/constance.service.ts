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

      // go to the previous view menu
      const currentMenuId = localStorage.getItem("id_menu");
      const menu = this.getMenu(Number(currentMenuId));
      if (menu) {
        this.setMenu(menu);
      }
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



  getMenu(id: number): Menu {
    for (const m of this.menus) {
      if (id === m.id) {
        return m;
      }
    }

    return null;
  }

  setCurrentSection(str: string) {
    this.currentSection = "MartSCO / " + str;
  }

  toAccueil() {
    this.router.navigate([this.utilRouteService.accueil]);
  }

  //menus
  public etablissement = new Menu(1, "Établissement");
  public evaluations = new Menu(2, "Évaluation");
  public exams = new Menu(3, "Examens");
  public comptabilite = new Menu(4, "Comptabilité");
  public bibliotheque = new Menu(5, "Bibliothèque");
  public planning = new Menu(6, "Planning");
  public cantine = new Menu(7, "Cantine");

  //sub-menu
  public evalType = new Menu(101, "Types d'evaluation");
  public evaluation_sub = new Menu(102, "Évaluation");

  public saisieNote = new Menu(103, "Saisie de notes (par matière)");
  public saisieNoteAll = new Menu(104, "Saisie de notes (toutes les matières)");
  public saisieNoteEval = new Menu(105, "Saisie de notes (par évaluation)");
  public bullNotes = new Menu(106, "Bulletin de notes");
  public resultGen = new Menu(107, "Résultat général");
  public rapportSaisie = new Menu(108, "Rapport de Saisie");
  public resultAn = new Menu(109, "Résultat annuel");
  public bullBilan = new Menu(110, "Bulletin bilan");
  public resultGenEval = new Menu(111, "Résultat général (Évaluation)");
  public relNotesEval = new Menu(112, "Relevé de notes (Évaluation)");
  public paramsEval = new Menu(113, "Paramètres");
  public baseDataEval = new Menu(114, "Données de base");


  public menus: Menu[] = [
    //menus
    this.etablissement, this.evaluations, this.exams,
    this.comptabilite, this.bibliotheque, this.planning, this.cantine,

    //sub-menus
    this.evalType, this.evaluation_sub, this.saisieNote, this.baseDataEval,
    this.saisieNoteAll, this.saisieNoteEval, this.bullNotes, this.resultGen, this.rapportSaisie,
    this.resultAn, this.bullBilan, this.resultGenEval, this.relNotesEval, this.paramsEval
  ];

  public currentMenu: Menu = this.etablissement;

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/utilities/services/action.service';
import { MatDialog } from '@angular/material/dialog';
import { IdentityCardService } from 'src/app/id-card-mg/identity-card.service';
import { EffectifReportService } from 'src/app/student-mg/services/effectif-report.service';
import { RouteService } from 'src/app/utilities/services/route.service';
import { SchoolRouteService } from '../services/school-route.service';

@Component({
  selector: 'app-establishment-menu',
  templateUrl: './establishment-menu.component.html',
  styleUrls: ['./establishment-menu.component.scss']
})
export class EstablishmentMenuComponent implements OnInit {
  public expanded: boolean;

  buttonCaption = "Expand";
  constructor(public dialog: MatDialog, public router: Router, public routeService: RouteService,
    public schoolRouteService: SchoolRouteService, public identityCardService: IdentityCardService,
    public effectifReportService: EffectifReportService, public actionService: ActionService) { }

  ngOnInit() {
  }

  toCountryList() {
    this.router.navigate([this.schoolRouteService.countryListRoute]);
  }

  toMinistaryList() {
    this.router.navigate([this.schoolRouteService.ministaryListRoute]);
  }

  toExamNationalList() {
    this.router.navigate([this.schoolRouteService.examNationalListRoute]);
  }

  toEstablishmentList() {
    this.router.navigate([this.schoolRouteService.establishmentListRoute]);
  }

  toCycleList() {
    this.router.navigate([this.schoolRouteService.cycleListRoute]);
  }

  toDecoupages() {
    this.router.navigate([this.routeService.decoupageListRoute]);
  }

  toEstablishmentTypeList() {
    this.router.navigate([this.schoolRouteService.establishmentTypeListRoute]);
  }

  toAcademicStandartList() {
    this.router.navigate([this.routeService.academicStandartListRoute]);
  }

  toSchoolClassList() {
    this.router.navigate([this.routeService.schoolClassListRoute]);
  }

  toStudentList() {
    this.router.navigate([this.routeService.studentListRoute]);
  }

  toEmployeeList() {
    this.router.navigate([this.routeService.employeeListRoute]);
  }

  toParentsList() {
    this.router.navigate([this.schoolRouteService.parentsListRoute]);
  }

  toSubjectList() {
    this.router.navigate([this.routeService.subjectListRoute]);
  }

  toSubjectTypeList() {
    this.router.navigate([this.routeService.subjectTypeListRoute]);
  }

  onListClassPdf(type: number) {
    this.actionService.launchAction(this.effectifReportService
      .generateListClassNominativeOf(type)).subscribe((resp) => { });
  }

  onStudentCard() {
    this.actionService.launchAction(this.identityCardService.generateCardClass())
      .subscribe((resp) => { });
  }

  onListExcel(type: number) {
    this.actionService.launchAction(this.effectifReportService.generateListClassNominativeOf(type))
      .subscribe((resp) => { });
  }

  toStudentRepartition() {
    this.router.navigate([this.routeService.studentRepartitionRoute]);
  }

  toStudentRepartitionManuelle() {
    this.router.navigate([this.routeService.studentRepartitionManuelleRoute]);
  }

  onFormulaireImportList() {
    console.log("I am called for formulaire");
    this.actionService.launchAction(this.effectifReportService.generateFormulaireImportList())
      .subscribe((resp) => { });
  }
}

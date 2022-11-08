import { Component, OnInit } from '@angular/core';
import { SchoolClassChooserFormComponent } from '../../establishment/school-class-chooser-form/class-chooser-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ClassChooserModel } from 'src/app/establishment/models/class-chooser-model';
import { SaisieNoteFormComponent } from '../saisie-note-form/saisie-note-form.component';
import { StudentResultReportService } from 'src/app/evaluation-trim/services/student-result-report.service';
import { ActionService } from 'src/app/utilities/services/action.service';
import { SubjectAttribution } from 'src/app/subject-mg/models/subject-attribution';
import { CoefSettingComponent } from '../coef-setting/coef-setting.component';
import { ConfigEvalFormComponent } from '../config-eval-form/config-eval-form.component';
import { SubjectAttributionComponent } from '../subject-attribution/subject-attribution.component';
import { Router } from '@angular/router';
import { StudentResultStatService } from '../services/student-result-stat.service';
import { RouteService } from 'src/app/utilities/services/route.service';
import { StudentResultStatBySexService } from '../services/student-result-stat-by-sex.service';



@Component({
  selector: 'app-evaluation-trim-menu',
  templateUrl: './evaluation-trim-menu.component.html',
  styleUrls: ['./evaluation-trim-menu.component.scss']
})
export class EvaluationTrimMenuComponent implements OnInit {

  expanded = false;

  constructor(public dialog: MatDialog, public studentResultReportService: StudentResultReportService,
    private studentResultStatBySexService: StudentResultStatBySexService,
    public studentResultStatMixteReportService: StudentResultStatService,
    public actionService: ActionService,
    public router: Router, public routeService: RouteService) { }

  ngOnInit() {
  }

  onSaisieNote(express: boolean) {
    const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
      width: '600px',
      data: { titre: 'Choisir la classe', subjectChooser: true, decoupageChooser: true }
    });

    dialogRef.componentInstance.eventEmitter.subscribe(
      (resp: ClassChooserModel) => {
        let formData = { titre: 'Espace de saisie des notes', chooserModel: resp, express: false };

        if (express) {
          formData = { titre: 'Espace de saisie des notes (Express)', chooserModel: resp, express: true };
        }

        const dialogSaisie = this.dialog.open(SaisieNoteFormComponent, {
          width: '600px',
          data: formData
        });
      }
    );
  }

  toSaisieAllNotes() {
    //   const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
    //     width: '600px',
    //     data: { titre: 'Choisir la classe' }
    //   });

    //   const validationSub = dialogRef.componentInstance.eventEmitter.subscribe(
    //     (resp: ClassChooserModel) => {
    //       const dialogSaisie = this.dialog.open(SaisieAllNoteComponent, {
    //         width: '1000px',
    //         data: { title: 'Saisie des notes (toutes les matières)' }
    //       });
    //       validationSub.unsubscribe();
    //     }
    //   );
  }

  onBulletinNotePdf(singleEval: boolean) {
    this.actionService.launchAction(this.studentResultReportService
      .generateBulletinNotePdf(singleEval)).subscribe((resp) => {
        console.log(">>>>>>>>>>>>")
      });
  }

  onResultatGenPdf(singleEval: boolean) {
    this.actionService.launchAction(this.studentResultReportService
      .generateResultatGenPdf(singleEval)).subscribe((resp) => { });
  }

  onResultatAnnuelPdf() {
    this.actionService.launchAction(this.studentResultReportService
      .generateResultatAnnuelPdf()).subscribe((resp) => { });
  }

  onBulletinBilanPdf() {
    this.actionService.launchAction(this.studentResultReportService
      .generateBulletinBilanPdf()).subscribe((resp) => { });
  }

  onRapportSaisiePdf() {
    this.actionService.launchAction(this.studentResultReportService
      .generateRapportSaisiePdf()).subscribe((resp) => { });
  }


  // stat mixte
  onStatMixteStandardPdf(singleEvaluation: boolean) {
    this.actionService.launchAction(this.studentResultStatMixteReportService
      .generateStatStandardPdf(singleEvaluation)).subscribe((resp) => { });
  }

  onStatMixteSchoolClassPdf(singleEvaluation: boolean) {
    this.actionService.launchAction(this.studentResultStatMixteReportService
      .generateStatSchoolClassPdf(singleEvaluation)).subscribe((resp) => { });
  }

  onStatMixteMoyAnSchoolClassPdf() {
    this.actionService.launchAction(this.studentResultStatMixteReportService
      .generateStatMoyAnSchoolClassPdf()).subscribe((resp) => { });
  }

  onStatMixteMoyAnStandardPdf() {
    this.actionService.launchAction(this.studentResultStatMixteReportService
      .generateStatMoyAnStandardPdf()).subscribe((resp) => { });
  }


  // stat by sex
  onStatBySexStandardPdf(singleEvaluation: boolean) {
    const statMixte = false;
    this.actionService.launchAction(this.studentResultStatBySexService
      .generateStatStandardPdf(singleEvaluation, statMixte)).subscribe((resp) => { });
  }

  onStatBySexSchoolClassPdf(singleEvaluation: boolean) {
    this.actionService.launchAction(this.studentResultStatBySexService
      .generateStatSchoolClassPdf(singleEvaluation)).subscribe((resp) => { });
  }

  onStatBySexMoyAnSchoolClassPdf() {
    this.actionService.launchAction(this.studentResultStatBySexService
      .generateStatMoyAnSchoolClassPdf()).subscribe((resp) => { });
  }

  onStatBySexMoyAnStandardPdf() {
    this.actionService.launchAction(this.studentResultStatBySexService
      .generateStatMoyAnStandardPdf()).subscribe((resp) => { });
  }

  toEvaluationList() {
    this.router.navigate([this.routeService.evaluationListRoute]);
  }

  toEvaluationTypeList() {
    this.router.navigate([this.routeService.evaluationTypeListRoute]);
  }

  onMatiereProg() {
    const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
      width: '600px',
      data: { titre: 'Choisir la classe' }
    });

    const validationSub = dialogRef.componentInstance.eventEmitter.subscribe(
      (resp: ClassChooserModel) => {
        console.log('choosed year: ' + resp.year.id + ' classe: ' + resp.schoolClass.id);
        // progress

        const dialogRef = this.dialog.open(SubjectAttributionComponent, {
          width: '1200px',
          data: {
            titre: 'Définir les matières au programme',
            schoolClass: resp.schoolClass,
            year: resp.year
          }
        });

        const validationSub2 = dialogRef.componentInstance.event.subscribe(
          (resp: SubjectAttribution[]) => {
            console.log('the size of the list : ' + resp.length);
            // progress
          }
        );
      }
    );
  }

  onConfigEvaluation() {
    const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
      width: '600px',
      data: { titre: 'Choisir la classe' }
    });

    const validationSub = dialogRef.componentInstance.eventEmitter.subscribe(
      (resp: ClassChooserModel) => {
        console.log('choosed year: ' + resp.year.designation + ' classe: ' + resp.schoolClass.designation);
        validationSub.unsubscribe();

        // progress
        const dialogRef = this.dialog.open(ConfigEvalFormComponent, {
          width: '800px',
          data: { titre: 'Configuration du type d\'évaluation', schoolClassChooser: resp }
        });

        const validationSub2 = dialogRef.componentInstance.event.subscribe(
          (resp: ClassChooserModel) => {
            console.log('choosed year: ' + resp.year.designation + ' classe: ' + resp.schoolClass.designation);
            // progress

          }
        );
      }
    );
  }

  onConfigCoef() {
    const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
      width: '600px',
      data: { titre: 'Choisir le niveau d\'enseignement', standardChooser: true }
    });

    const validationSub = dialogRef.componentInstance.eventEmitter.subscribe(
      (resp: ClassChooserModel) => {
        console.log('choosed year: ' + resp.year.id + ' standard ' + resp.standard.designation);
        // progress
        resp.titre = "Définir les coefficients des matières";

        const dialogRef = this.dialog.open(CoefSettingComponent, {
          width: '600px',
          data: resp
        });

        const validationSub2 = dialogRef.componentInstance.event.subscribe(
          (resp: SubjectAttribution[]) => {
            console.log('the size of the list : ' + resp.length);
            // progress
          }
        );
      }
    );
  }

}

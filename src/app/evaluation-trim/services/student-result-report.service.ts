import { ActionService } from './../../utilities/services/action.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  SchoolClassChooserFormComponent,
} from 'src/app/establishment/school-class-chooser-form/class-chooser-form.component';
import { ClassChooserModel } from 'src/app/establishment/models/class-chooser-model';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { ProgressService } from '../../utilities/services/progress.service';
import { RouteService } from '../../utilities/services/route.service';
import { StudentCursusService } from '../../student-mg/services/student-cursus.service';
import { FileService } from '../../utilities/services/file.service';
import { AuthService } from 'src/app/utilities/services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class StudentResultReportService {

  static BULLETIN = 1; static RESULT_GEN = 2; static RAPPORT_SAISIE: 3;

  // API url;
  private API_MARTSCO = this.appConfigsService.apiUrl;
  currentUserId: number;

  constructor(public dialog: MatDialog, public studentService: StudentCursusService,
    public routeService: RouteService, public httpClient: HttpClient,
    public fileService: FileService, public authService: AuthService,
    private actionService: ActionService,
    public appConfigsService: AppConfigsService, public progressService: ProgressService) {

    authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }


  generateBulletinNotePdf(singleEval: boolean): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe(progressId => {

        let chooserData = { titre: 'Choisir les paramètres', decoupageChooser: true, evaluationChooser: false };

        if (singleEval) {
          chooserData = { titre: 'Choisir les paramètres', decoupageChooser: true, evaluationChooser: true };
        }

        const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
          width: '600px',
          data: chooserData
        });

        dialogRef.componentInstance.eventEmitter.subscribe(
          (chooserModel: ClassChooserModel) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));

            const url = this.API_MARTSCO + "/bulletin-results/bulletin-notes/" + chooserModel.schoolClass.id
              + "/" + chooserModel.year.id + "/" + chooserModel.decoupage.id + "/" + chooserModel.selectedEvaluationId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "bulletin_" + chooserModel.schoolClass.designation, progressId);

            return observer.next();
          });
      });
    });
  }

  generateResultatGenPdf(singleEval: boolean): Observable<any> {
    return new Observable((observer) => {

      let chooserData = { titre: 'Choisir les paramètres', decoupageChooser: true, evaluationChooser: false };

      if (singleEval) {
        chooserData = { titre: 'Choisir les paramètres', decoupageChooser: true, evaluationChooser: true };
      }

      const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
        width: '600px',
        data: chooserData
      });

      dialogRef.componentInstance.eventEmitter.subscribe(
        (chooserModel: ClassChooserModel) => {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));


            const url = this.API_MARTSCO + "/bulletin-results/result-gen/" + chooserModel.schoolClass.id
              + "/" + chooserModel.year.id + "/" + chooserModel.decoupage.id + "/" + chooserModel.selectedEvaluationId
              + "/" + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "resultat_" + chooserModel.schoolClass.designation, progressId);

            observer.next();
          });
        });
    });
  }

  generateResultatAnnuelPdf(): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        const chooserData = {
          titre: 'Choisir la classe', decoupageChooser: false
        };

        const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
          width: '600px',
          data: chooserData
        });

        dialogRef.componentInstance.eventEmitter.subscribe(
          (chooserModel: ClassChooserModel) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));

            const url = this.API_MARTSCO + "/bulletin-results/result-annuel/"
              + chooserModel.schoolClass.id + "/" + chooserModel.year.id
              + "/" + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "resultat_annuel_" + chooserModel.schoolClass.designation, progressId);

            return observer.next();
          });
      });
    });
  }

  generateBulletinBilanPdf(): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        const chooserData = {
          titre: 'Choisir la classe', decoupageChooser: false
        };

        const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
          width: '600px',
          data: chooserData
        });

        dialogRef.componentInstance.eventEmitter.subscribe(
          (chooserModel: ClassChooserModel) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));

            const url = this.API_MARTSCO + "/bulletin-results/bulletin-bilan/" + chooserModel.schoolClass.id
              + "/" + chooserModel.year.id + "/" + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "bulletin_bilan_" + chooserModel.schoolClass.designation, progressId);

            return observer.next();
          });
      });
    });
  }

  generateRapportSaisiePdf(): Observable<any> {
    return new Observable((observer) => {


      const chooserData = { titre: 'Choisir la matière', decoupageChooser: true, subjectChooser: true };

      const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
        width: '600px',
        data: chooserData
      });

      dialogRef.componentInstance.eventEmitter.subscribe(
        (chooserModel: ClassChooserModel) => {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));

            const url = this.API_MARTSCO + "/bulletin-results/rapport-saisie/" + chooserModel.subject.id
              + "/" + chooserModel.schoolClass.id + "/" + chooserModel.year.id + "/"
              + chooserModel.decoupage.id + "/" + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "rapport_saisie" + chooserModel.schoolClass.designation + "-" + chooserModel.subject.designation, progressId);

            return observer.next();
          });
        });
    });
  }
}

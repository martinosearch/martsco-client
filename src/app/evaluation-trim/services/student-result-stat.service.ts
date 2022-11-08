import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SchoolClassChooserFormComponent } from '../../establishment/school-class-chooser-form/class-chooser-form.component';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { ProgressService } from '../../utilities/services/progress.service';
import { RouteService } from '../../utilities/services/route.service';
import { StudentCursusService } from '../../student-mg/services/student-cursus.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { FileService } from 'src/app/utilities/services/file.service';
import { ClassChooserModel } from 'src/app/establishment/models/class-chooser-model';


@Injectable({
  providedIn: 'root'
})
export class StudentResultStatService {

  // API url;
  private API_MARTSCO = this.appConfigsService.apiUrl;
  private API_END_POINT = this.API_MARTSCO + '/student-result-stat';
  public currentUserId: number;

  constructor(public dialog: MatDialog, public studentService: StudentCursusService,
    public routeService: RouteService, public httpClient: HttpClient,
    public fileService: FileService, public authService: AuthService,
    public appConfigsService: AppConfigsService, public progressService: ProgressService) {

    authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }

  generateStatStandardPdf(evaluation: boolean): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {

        let chooserData = {};
        if (evaluation) {
          chooserData = {
            titre: 'Choisir le niveau', decoupageChooser: true, standardChooser: true,
            evaluationChooser: true, singleEval: true
          };
        } else {
          chooserData = {
            titre: 'Choisir le niveau', decoupageChooser: true, standardChooser: true
          };
        }

        const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
          width: '600px',
          data: chooserData
        });

        dialogRef.componentInstance.eventEmitter.subscribe(
          (chooserModel: ClassChooserModel) => {
            observer.next(progressId);
            observer.next(this.progressService.getProgress(progressId));


            const url = this.API_END_POINT + "/statistique-standard/" + chooserModel.standard.id
              + "/" + chooserModel.year.id + "/" + chooserModel.decoupage.id + "/" + chooserModel.selectedEvaluationId
              + "/" + this.currentUserId + "/" + progressId

            this.fileService.downloadAndShowPdf(url, "stat_mixte_niveau", progressId);
            observer.next();
          });
      });
    });
  }

  generateStatSchoolClassPdf(evaluation: boolean): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {

        let chooserData = {};
        if (evaluation) {
          chooserData = {
            titre: 'Choisir la classe', decoupageChooser: true, schoolClassChooser: true,
            evaluationChooser: true, singleEval: true
          };
        } else {
          chooserData = {
            titre: 'Choisir la classe', decoupageChooser: true, schoolClassChooser: true
          };
        }

        const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
          width: '600px',
          data: chooserData
        });

        dialogRef.componentInstance.eventEmitter.subscribe(
          (chooserModel: ClassChooserModel) => {
            observer.next(progressId);
            observer.next(this.progressService.getProgress(progressId));

            const url = this.API_END_POINT + "/statistique-school-class/" + chooserModel.schoolClass.id +
              "/" + chooserModel.year.id + "/" + chooserModel.decoupage.id + "/" + chooserModel.selectedEvaluationId + "/"
              + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "stat_mixte_classe", progressId);

            observer.next();
          });
      });
    });
  }


  //stat mixte moyenne annuelle
  generateStatMoyAnSchoolClassPdf(): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {

        let chooserData = {
          titre: 'Choisir la classe', schoolClassChooser: true, decoupageChooser: false
        };

        const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
          width: '600px',
          data: chooserData
        });

        dialogRef.componentInstance.eventEmitter.subscribe(
          (chooserModel: ClassChooserModel) => {
            observer.next(progressId);
            observer.next(this.progressService.getProgress(progressId));

            const url = this.API_END_POINT + "/statistique-moy-an-school-class/"
              + chooserModel.schoolClass.id + "/" + chooserModel.year.id + "/"
              + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "stat_mixte_classe", progressId);

            observer.next();
          });
      });
    });
  }

  //stat mixte moyenne annuelle niveau
  generateStatMoyAnStandardPdf(): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {

        let chooserData = {
          titre: 'Choisir la classe', standardChooser: true, decoupageChooser: false
        };

        const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
          width: '600px',
          data: chooserData
        });

        dialogRef.componentInstance.eventEmitter.subscribe(
          (chooserModel: ClassChooserModel) => {
            observer.next(progressId);
            observer.next(this.progressService.getProgress(progressId));

            const url = this.API_END_POINT + "/statistique-moy-an-standard/"
              + chooserModel.standard.id + "/" + chooserModel.year.id + "/"
              + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "stat_mixte_niveau", progressId);

            observer.next();
          });
      });
    });
  }
}

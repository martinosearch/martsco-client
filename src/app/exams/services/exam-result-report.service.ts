import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { ProgressService } from '../../utilities/services/progress.service';
import { RouteService } from '../../utilities/services/route.service';
import { StudentCursusService } from '../../student-mg/services/student-cursus.service';
import { FileService } from '../../utilities/services/file.service';
import { ExamChooserComponent } from '../exam-chooser/exam-chooser.component';
import { ExamChooserModel } from '../models/exam-chooser-model';
import { AuthService } from 'src/app/utilities/services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class ExamResultReportService {

  static BULLETIN = 1; static RESULT_GEN = 2; static RAPPORT_SAISIE: 3;

  // API url;
  private API = this.appConfigsService.apiUrl;
  currentUserId: number;

  constructor(public dialog: MatDialog, public studentService: StudentCursusService,
    public routeService: RouteService, public httpClient: HttpClient,
    public fileService: FileService, public authService: AuthService,
    public appConfigsService: AppConfigsService, public progressService: ProgressService) {

    authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }

  generateRapportSaisiePdf(): Observable<any> {
    return new Observable((observer) => {

      const dialogRef = this.dialog.open(ExamChooserComponent, {
        width: '600px',
        data: { titre: 'Choisir les paramètres', isSubjectChooser: true }
      });

      dialogRef.componentInstance.eventEmitter.subscribe(
        (chooserModel: ExamChooserModel) => {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));

            const url = this.API + "/exam-results/rapport-saisie/" + chooserModel.exam.id
              + "/" + chooserModel.subject.id + "/" + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "rapport_saisie" + chooserModel.subject.designation + "-" + chooserModel.exam.designation, progressId);

            return observer.next();
          });
        });
    });
  }

  generateResultGenPdf(): Observable<any> {
    return new Observable((observer) => {

      const dialogRef = this.dialog.open(ExamChooserComponent, {
        width: '600px',
        data: { titre: 'Choisir les paramètres', isSubjectChooser: false }
      });

      dialogRef.componentInstance.eventEmitter.subscribe(
        (chooserModel: ExamChooserModel) => {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));

            const url = this.API + "/exam-results/result-gen/" + chooserModel.exam.id + "/" + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "result_gen" + "_" + chooserModel.exam.designation, progressId);

            return observer.next();
          });
        });
    });
  }

  generateRelevePdf(): Observable<any> {
    return new Observable((observer) => {
      const dialogRef = this.dialog.open(ExamChooserComponent, {
        width: '600px',
        data: { titre: 'Choisir les paramètres', isSubjectChooser: false }
      });

      dialogRef.componentInstance.eventEmitter.subscribe(
        (chooserModel: ExamChooserModel) => {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));

            const url = this.API + "/exam-results/releve/" + chooserModel.exam.id + "/" + chooserModel.establishment.id + "/" + this.currentUserId + "/" + progressId;

            this.fileService.downloadAndShowPdf(url, "releve" + "_" + chooserModel.exam.designation, progressId);

            return observer.next();
          });
        });
    });
  }
}

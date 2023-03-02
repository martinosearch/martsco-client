import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { FileService } from 'src/app/utilities/services/file.service';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { ExamChooserComponent } from '../exam-chooser/exam-chooser.component';
import { ExamChooserModel } from '../models/exam-chooser-model';

@Injectable({
  providedIn: 'root'
})
export class ExamStatReportService {


  // API url;
  private API = this.appConfigsService.apiUrl;
  currentUserId: number;

  constructor(public dialog: MatDialog,
    private fileService: FileService, private authService: AuthService,
    private appConfigsService: AppConfigsService, private progressService: ProgressService) {

    authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }

  generateStatEstablishmentPdf(): Observable<any> {
    return new Observable((observer) => {

      const dialogRef = this.dialog.open(ExamChooserComponent, {
        width: '600px',
        data: { titre: 'Choisir les paramètres', isEstablishmentChooser: true }
      });

      dialogRef.componentInstance.eventEmitter.subscribe(
        (chooserModel: ExamChooserModel) => {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));

            console.log(JSON.stringify(chooserModel));

            const url = this.API + "/exam-stat/stat-establishment/" + chooserModel.exam.id + "/" + chooserModel.establishment.id + "/" + this.currentUserId + "/" + progressId;
            console.log(url);

            this.fileService.downloadAndShowPdf(url, "stat_" + chooserModel.establishment.designation + "-" + chooserModel.exam.designation, progressId);

            return observer.next();
          });
        });
    });
  }

  generateStatAllPdf(): Observable<any> {
    return new Observable((observer) => {
      const dialogRef = this.dialog.open(ExamChooserComponent, {
        width: '600px',
        data: { titre: 'Choisir les paramètres', isEstablishmentChooser: false }
      });

      dialogRef.componentInstance.eventEmitter.subscribe(
        (chooserModel: ExamChooserModel) => {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            observer.next(progressId);

            observer.next(this.progressService.getProgress(progressId));

            console.log(JSON.stringify(chooserModel));

            const url = this.API + "/exam-stat/stat-all/" + chooserModel.exam.id + "/" + this.currentUserId + "/" + progressId;
            console.log(url);

            this.fileService.downloadAndShowPdf(url, "stat_tous_" + chooserModel.exam.designation, progressId);

            return observer.next();
          });
        });
    });
  }
}

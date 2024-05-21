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
export class ExamEffectifReportService {

  private API_MARTSCO = this.appConfigsService.apiUrl;
  currentUserId: number;

  // generation of list_class
  generateFormulaireImportList(): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {

        observer.next(progressId);

        console.log("ask for download formule import list");

        let url = this.API_MARTSCO + "/exams-doc-effectif/formulaire-import-list";

        this.fileService.downloadExcel(url, "liste_import_exam", progressId);
        return observer.next();
      });
    });
  }

  // generation of list_class pdf
  generateRepartionInRoomsPdf(type: number): Observable<any> {
    return new Observable((observer) => {
      const chooserData = { titre: 'Choisir la classe' };

      const dialogRef = this.dialog.open(ExamChooserComponent, {
        width: '600px',
        data: chooserData
      });

      dialogRef.componentInstance.eventEmitter.subscribe(
        (chooserModel: ExamChooserModel) => {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            const examDesignation = chooserModel.exam.designation;
            let fileName = "liste_nominative_" + examDesignation;

            let url = this.API_MARTSCO + "/exams-doc-effectif/repartition-rooms-pdf/"
              + chooserModel.exam.id + "/" + this.currentUserId + "/" + progressId;

            observer.next(progressId);
            observer.next(this.progressService.getProgress(progressId));

            if (type < 10) {
              this.fileService.downloadAndShowPdf(url, fileName, progressId);
            } else {
              this.fileService.downloadExcel(url, fileName, progressId);
            }

            return observer.next();
          });
        });
    });
  }

  constructor(private dialog: MatDialog, private progressService: ProgressService,
    private fileService: FileService, private authService: AuthService,
    private appConfigsService: AppConfigsService) {
    authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }
}

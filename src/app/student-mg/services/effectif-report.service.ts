import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ClassChooserModel } from 'src/app/establishment/models/class-chooser-model';
import { SchoolClassChooserFormComponent } from 'src/app/establishment/school-class-chooser-form/class-chooser-form.component';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { FileService } from 'src/app/utilities/services/file.service';
import { PdfViewerService } from 'src/app/utilities/services/pdf-viewer.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { RouteService } from 'src/app/utilities/services/route.service';


@Injectable({
  providedIn: 'root'
})

export class EffectifReportService {
  // API url;
  private API_MARTSCO = this.appConfigsService.apiUrl;
  currentUserId: number;

  constructor(public dialog: MatDialog,
    public routeService: RouteService, public httpClient: HttpClient, public fileService: FileService,
    public pdfViewerService: PdfViewerService, public authService: AuthService,
    public appConfigsService: AppConfigsService, public constanceService: ConstanceService,
    public progressService: ProgressService) {

    authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }

  // generation of list_class pdf
  generateListClassNominativeOf(type: number): Observable<any> {
    return new Observable((observer) => {
      const chooserData = { titre: 'Choisir la classe' };

      const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
        width: '600px',
        data: chooserData
      });

      dialogRef.componentInstance.eventEmitter.subscribe(
        (chooserModel: ClassChooserModel) => {
          this.progressService.getNewProgressId().subscribe((progressId) => {
            const classDesignation = chooserModel.schoolClass.designation;
            let fileName = "liste_nominative_" + classDesignation;

            let url = this.API_MARTSCO + "/doc-effectif/list-class-nominative-pdf/" + chooserModel.schoolClass.id
              + "/" + chooserModel.year.id + "/" + this.currentUserId + "/" + progressId;

            if (type === 2) {
              fileName = "liste_de_presence_" + classDesignation;
              url = this.API_MARTSCO + "/doc-effectif/list-class-presence-pdf/" + chooserModel.schoolClass.id +
                "/" + chooserModel.year.id + "/" + this.currentUserId + "/" + progressId;
            }

            if (type === 3) {
              fileName = "liste_fiche_de_notes_4_" + classDesignation;
              url = this.API_MARTSCO + "/doc-effectif/list-class-4-notes-pdf/" + chooserModel.schoolClass.id +
                "/" + chooserModel.year.id + "/" + this.currentUserId + "/" + progressId;
            }

            if (type === 4) {
              fileName = "liste_fiche_de_notes_10_" + classDesignation;
              url = this.API_MARTSCO + "/doc-effectif/list-class-10-notes-pdf/" + chooserModel.schoolClass.id +
                "/" + chooserModel.year.id + "/" + this.currentUserId + "/" + progressId;
            }

            // liste nominative excel
            if (type === 10) {
              fileName = "liste_nominative_excel" + classDesignation;
              url = this.API_MARTSCO + "/doc-effectif/list-class-nominative-excel/" + chooserModel.schoolClass.id +
                "/" + chooserModel.year.id + "/" + this.currentUserId + "/" + progressId;
            }

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

  // generation of list_class
  generateFormulaireImportList(): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {

        observer.next(progressId);

        console.log("ask for download formule import list");

        let url = this.API_MARTSCO + "doc-effectif/formulaire-import-list";
        this.fileService.downloadExcel(url, "liste_import", progressId);
        return observer.next();
      });
    });
  }
}

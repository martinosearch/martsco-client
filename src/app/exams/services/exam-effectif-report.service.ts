import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { FileService } from 'src/app/utilities/services/file.service';
import { ProgressService } from 'src/app/utilities/services/progress.service';

@Injectable({
  providedIn: 'root'
})
export class ExamEffectifReportService {
  private API_MARTSCO = this.appConfigsService.apiUrl;

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

  constructor(private progressService: ProgressService, private fileService: FileService,
    private appConfigsService: AppConfigsService) { }
}

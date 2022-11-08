import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { SchoolClassChooserFormComponent } from 'src/app/establishment/school-class-chooser-form/class-chooser-form.component';
import { ClassChooserModel } from 'src/app/establishment/models/class-chooser-model';
import { AppConfigsService } from '../utilities/services/app-configs.service';
import { FileService } from '../utilities/services/file.service';
import { ProgressService } from '../utilities/services/progress.service';
import { AuthService } from '../utilities/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IdentityCardService {
  currentUserId: number;
  // API url;
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(public dialog: MatDialog, public progressService: ProgressService,
    public appConfigsService: AppConfigsService, public authService: AuthService,
    public fileService: FileService) {

    authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }

  generateCardClass(): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {

        const chooserData = { titre: 'Choisir la classe' };

        const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
          width: '600px',
          data: chooserData
        });

        dialogRef.componentInstance.eventEmitter.subscribe(
          (chooserModel: ClassChooserModel) => {
            let url = this.API_MARTSCO + "/identity-card/student-identity-card-pdf/"
              + chooserModel.schoolClass.id + "/" + chooserModel.year.id
              + "/" + this.currentUserId + "/" + progressId;

            observer.next(progressId);
            observer.next(this.progressService.getProgress(progressId));

            const fileName = "carte_d_identites_" + chooserModel.schoolClass.designation;
            this.fileService.downloadAndShowPdf(url, fileName, progressId);

            return observer.next();
          });
      });
    });
  }
}

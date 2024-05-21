import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import {
  SchoolClassChooserFormComponent
} from '../../establishment/school-class-chooser-form/class-chooser-form.component';
import { ClassChooserModel } from '../../establishment/models/class-chooser-model';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { PdfViewerService } from '../../utilities/services/pdf-viewer.service';
import { Year } from 'src/app/establishment/models/year';
import { ConstanceService } from '../../utilities/services/constance.service';
import { ProgressService } from '../../utilities/services/progress.service';
import { RouteService } from '../../utilities/services/route.service';
import { StudentCursusService } from '../../student-mg/services/student-cursus.service';
import { StudentComptaBean } from '../models/student-compta-Bean';
import { FileService } from '../../utilities/services/file.service';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComptaReportingService {

  static BULLETIN = 1; static RESULT_GEN = 2; static RAPPORT_SAISIE: 3;

  // API url;
  private API_MARTSCO = this.appConfigsService.apiUrl;
  private API_END_POINT: string;
  currentYear: Year;
  currentUserId: number;

  constructor(public dialog: MatDialog, public studentService: StudentCursusService,
    public constanceService: ConstanceService, public progressService: ProgressService,
    public routeService: RouteService, public httpClient: HttpClient, private fileService: FileService,
    public pdfViewerService: PdfViewerService, public authService: AuthService,
    public appConfigsService: AppConfigsService) {
    this.API_END_POINT = this.API_MARTSCO + '/doc-compta';

    authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }

  paymentStatementPerClass(): Observable<any> {
    console.log("I am called for paymentStatement");
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        observer.next(this.progressService.getProgress(progressId));

        const chooserData = { titre: 'Choisir la classe', expenseChooser: true };

        const dialogRef = this.dialog.open(SchoolClassChooserFormComponent, {
          width: '600px',
          data: chooserData
        });

        dialogRef.componentInstance.eventEmitter.subscribe(
          (chooserModel: ClassChooserModel) => {
            const url = `${this.API_END_POINT}/payment-statement/${chooserModel.expense.id}/${chooserModel.schoolClass.id}
            /${chooserModel.year.id}/${this.currentUserId}/${progressId}`;

            this.fileService.downloadAndShowPdf(url, "bordereau_payement", progressId);

            return observer.next();
          });
      });
    });
  }

  generateReceiptOf(student: StudentComptaBean, serial: number, option: number): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        observer.next(this.progressService.getProgress(progressId));

        const url = `${this.API_END_POINT}/payment-receipt/${serial}/${this.currentUserId}/${progressId}`;

        if (option === 0) {
          this.downloadReceipt(url, student);
        } else {
          this.downloadAndPrintReceipt(url, student);
        }
      });
    });
  }

  downloadAndPrintReceipt(url: string, student: StudentComptaBean) {
    const httpOptions = { responseType: 'blob' as 'json' };

    this.httpClient.post<Blob>(url, student, httpOptions).subscribe(
      response => {
        const pdf = new Blob([response], { type: 'application/pdf' });

        const fileURL = window.URL.createObjectURL(pdf);
        console.log('file downloaded !');

        this.fileService.printUrl(fileURL);
      },
      (error: HttpErrorResponse) => {
        console.log('Error downloading ' + error);
      }
    );
  }

  downloadReceipt(url: string, student: StudentComptaBean) {
    const httpOptions = { responseType: 'blob' as 'json' };

    this.httpClient.post<Blob>(url, student, httpOptions).subscribe(
      response => {
        const pdf = new Blob([response], { type: "application/pdf" });

        this.pdfViewerService.show(pdf);
        console.log('file downloaded !');
      },
      (error: HttpErrorResponse) => {
        console.log('Error downloading ' + error);
      }
    );
  }

  getNewReceiptSerial(studentId: number, currentYearId: number): Observable<number> {
    const url = `${this.API_END_POINT}/new-receipt-serial/${studentId}/${currentYearId}`;
    return this.httpClient.get<number>(url);
  }
}

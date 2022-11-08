import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Year } from 'src/app/establishment/models/year';
import { AcademicStandardService } from 'src/app/establishment/services/academic-standard.service';
import { ClassChooserModel } from 'src/app/establishment/models/class-chooser-model';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { PdfViewerService } from 'src/app/utilities/services/pdf-viewer.service';
import { StudentCursus } from '../models/student-cursus';
import { StudentCursusBean } from '../models/studentCursusBean';
import { StudentIdentityBean } from '../models/studentIdentityBean';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { AuthService } from 'src/app/utilities/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class StudentCursusService {
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  public types = [];
  public currentObj: any;
  currentUserId: number;

  constructor(
    public httpClient: HttpClient, private pdfViewerService: PdfViewerService,
    private authService: AuthService, public typeService: AcademicStandardService,
    public appConfigsService: AppConfigsService, private progressService: ProgressService
  ) {
    this.authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    })
  }

  getAllByYear(yearId: number): Observable<StudentCursusBean[]> {
    console.log("getting all student");
    return this.httpClient.get<StudentCursusBean[]>(`${this.API_MARTSCO}/student-cursus/list/${yearId}`);
  }

  getAllByClass(classId: number, yearId: number): Observable<StudentCursusBean[]> {
    return this.httpClient.get<StudentCursusBean[]>(`${this.API_MARTSCO}/student-cursus/list/${classId}/${yearId}`);
  }

  getOne(studentId: number): Observable<StudentCursusBean> {
    return this.httpClient.get<StudentCursusBean>(`${this.API_MARTSCO}/student-cursus/info/${studentId}`);
  }

  getOneByYear(studentId: number, yearId: number): Observable<StudentCursusBean> {
    return this.httpClient.get<StudentCursusBean>(`${this.API_MARTSCO}/student-cursus/info/${studentId}/${yearId}`);
  }

  save(student: StudentIdentityBean, schoolClass: SchoolClassIdentityBean, year: Year, schooling: number): Observable<StudentCursusBean> {
    const curs = new StudentCursus();
    curs.schoolClass = schoolClass;
    curs.year = year;
    curs.schooling = schooling;

    const body = { studentIdentityBean: student, studentCursus: curs };

    console.log("student cursus bean:" + JSON.stringify(body));

    return this.httpClient.post<StudentCursusBean>(this.API_MARTSCO + "/student-cursus/save", body);
  }

  importExcel(classParam: ClassChooserModel, file: File): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        observer.next(progressId);
        observer.next(this.progressService.getProgress(progressId));

        const data = new FormData();
        data.append('file', file);

        console.log(">>> posting file:" + JSON.stringify(file));


        const action = this.httpClient.post<any>(this.API_MARTSCO + "/student-cursus/import-excel/" +
          classParam.schoolClass.id + "/" + classParam.year.id + "/" + this.currentUserId
          + "/" + progressId, data);

        action.subscribe(
          (resp) => {
            observer.next(resp);
          },
          (error) => {
            observer.error(error);
          },
          () => {
            observer.next();
          });
      });
    });
  }

  deleteCursus(studentId: number, yearId: number): Observable<any> {
    console.log('to be delete: ' + studentId + ' year : ' + yearId);
    return this.httpClient.delete<any>(`${this.API_MARTSCO}/student-cursus/cursus-delete/${studentId}/${yearId}`);
  }

  deleteAllCursus(stagged: StudentIdentityBean[], yearId: number) {
    return this.httpClient.post<any>(`${this.API_MARTSCO}/student-cursus/cursus-all-delete/${yearId}`, stagged);
  }

  setAsRedoublantAll(stagged: StudentIdentityBean[], yearId: number) {
    return this.httpClient.post<any>(`${this.API_MARTSCO}/student-cursus/set-as-redoublant-all/${yearId}`, stagged);
  }

  getTypes() {
    return this.typeService.getAll();
  }

  getCurrentCursus(studentId: number, currentYearId: number): Observable<StudentCursus> {
    return this.httpClient.get<StudentCursus>(`${this.API_MARTSCO}/student-cursus/current-cursus/${studentId}/${currentYearId}`);
  }

  getCurrentCursusFromList(cursusList: StudentCursusBean[], studentId: number, yearId: number): Observable<StudentCursus> {
    return new Observable((observer) => {
      const result = cursusList.filter((item) => item.id === studentId)[0];
      if (result !== undefined) {
        const curs = result.cursuses.filter((item) => item.year.id === yearId)[0];
        observer.next(curs);
      }
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { CandidateIdentityBean } from '../models/candidate-identity-bean';
import { EstablishmentExamIdentityBean } from '../models/exam-establishment-identity-bean';
import { ExamIdentityBean } from '../models/exam-identity-bean';

@Injectable({
  providedIn: 'root'
})
export class CandidateIdentityService {


  API: string = this.appConfigsService.apiUrl;
  currentUserId: number;

  save(model: CandidateIdentityBean): Observable<CandidateIdentityBean> {
    return this.httpClient.post<CandidateIdentityBean>(this.API + "/candidate-identity/save", model);
  }

  getAll(examId: number): Observable<CandidateIdentityBean[]> {
    return this.httpClient.get<CandidateIdentityBean[]>(this.API + "/candidate-identity/list/" + examId);
  }

  getAllByTableNumber(examId: number) {
    return this.httpClient.get<CandidateIdentityBean[]>(this.API + "/candidate-identity/list-by-num-table/" + examId);
  }

  delete(id: number): Observable<CandidateIdentityBean> {
    return this.httpClient.delete<CandidateIdentityBean>(this.API + '/candidate-identity/delete/' + id);
  }

  getOne(id: number): Observable<CandidateIdentityBean> {
    return this.httpClient.get<CandidateIdentityBean>(this.API + "/candidate-identity/info/" + id);
  }

  importExcel(exam: ExamIdentityBean, establishment: EstablishmentExamIdentityBean, file: File): Observable<any> {
    return new Observable((observer) => {
      this.progressService.getNewProgressId().subscribe((progressId) => {
        observer.next(progressId);
        observer.next(this.progressService.getProgress(progressId));

        const data = new FormData();
        data.append('file', file);

        //console.log(">>> posting file:" + JSON.stringify(file));
        const action = this.httpClient.post<any>(this.API + "/candidate-identity/import-excel/" +
          exam.id + "/" + establishment.id + "/" + this.currentUserId
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

  constructor(private httpClient: HttpClient, private appConfigsService: AppConfigsService,
    private progressService: ProgressService, private authService: AuthService) {
    this.authService.currentUserSubj.subscribe((resp) => {
      this.currentUserId = resp;
    });
  }
}

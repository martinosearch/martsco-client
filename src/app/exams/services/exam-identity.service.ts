import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Year } from 'src/app/establishment/models/year';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { ExamIdentityBean } from '../models/exam-identity-bean';
import { ProgressService } from 'src/app/utilities/services/progress.service';
import { ActionService } from 'src/app/utilities/services/action.service';

@Injectable({
  providedIn: 'root'
})
export class ExamIdentityService {


  API: string = this.appConfigsService.apiUrl;
  currentYear: Year;

  save(model: ExamIdentityBean): Observable<ExamIdentityBean> {
    return this.httpClient.post<ExamIdentityBean>(this.API + "/exam/save", model);
  }

  getAll(): Observable<ExamIdentityBean[]> {
    return new Observable((observer) => {
      let list = [];

      this.httpClient.get<ExamIdentityBean[]>(this.API + "/exam/list").subscribe({
        next: (resp) => {
          list = resp.filter(item => item.year.id === this.currentYear.id);
          observer.next(list);
        }
      });
    });
  }

  delete(id: number): Observable<ExamIdentityBean> {
    return this.httpClient.delete<ExamIdentityBean>(this.API + '/exam/delete/' + id);
  }

  getOne(id: number): Observable<ExamIdentityBean> {
    return this.httpClient.get<ExamIdentityBean>(this.API + "/exam/info/" + id);
  }

  updateTableNumber(id: number) {
    this.progressService.getNewProgressId().subscribe((progressId) => {
      this.actionService.launchWaiting(progressId);

      this.httpClient.get<ExamIdentityBean>(this.API + "exam/update-table-number/" + id).subscribe((resp) => {
        this.actionService.stopWaiting(progressId);
      });
    });
  }

  constructor(private httpClient: HttpClient, private appConfigsService: AppConfigsService,
    private constanceService: ConstanceService, private progressService: ProgressService,
    private actionService: ActionService) {
    constanceService.currentYearSubject.subscribe({
      next: resp => {
        this.currentYear = resp;
      }
    });
  }
}

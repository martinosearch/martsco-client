import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { ExamIdentityBean } from '../models/exam-identity-bean';

@Injectable({
  providedIn: 'root'
})
export class ExamIdentityService {

  API: string = this.appConfigsService.apiUrl;

  save(model: ExamIdentityBean): Observable<ExamIdentityBean> {
    return this.httpClient.post<ExamIdentityBean>(this.API + "/exam/save", model);
  }

  getAll(): Observable<ExamIdentityBean[]> {
    return this.httpClient.get<ExamIdentityBean[]>(this.API + "/exam/list");
  }

  delete(id: number): Observable<ExamIdentityBean> {
    return this.httpClient.delete<ExamIdentityBean>(this.API + '/exam/delete/' + id);
  }

  getOne(id: number): Observable<ExamIdentityBean> {
    return this.httpClient.get<ExamIdentityBean>(this.API + "/exam/info/" + id);
  }

  constructor(private httpClient: HttpClient, private appConfigsService: AppConfigsService) { }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { ExamSettingBean } from '../models/exam-setting-bean';

@Injectable({
  providedIn: 'root'
})
export class ExamSettingService {

  API: string = this.appConfigsService.apiUrl;

  save(model: ExamSettingBean): Observable<ExamSettingBean> {
    return this.httpClient.post<ExamSettingBean>(this.API + "/exam-setting/save", model);
  }

  getAll(): Observable<ExamSettingBean[]> {
    return this.httpClient.get<ExamSettingBean[]>(this.API + "/exam-setting/list");
  }

  delete(id: number): Observable<ExamSettingBean> {
    return this.httpClient.delete<ExamSettingBean>(this.API + '/exam-setting/delete/' + id);
  }

  getOne(id: number): Observable<ExamSettingBean> {
    return this.httpClient.get<ExamSettingBean>(this.API + "/exam-setting/info/" + id);
  }

  constructor(private httpClient: HttpClient, private appConfigsService: AppConfigsService) { }
}

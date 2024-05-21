import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { EstablishmentExamIdentityBean } from '../models/exam-establishment-identity-bean';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentExamIdentityService {

  API: string = this.appConfigsService.apiUrl;

  save(model: EstablishmentExamIdentityBean): Observable<EstablishmentExamIdentityBean> {
    return this.httpClient.post<EstablishmentExamIdentityBean>(this.API + "/establishment-exam-identity/save", model);
  }

  getAll(): Observable<EstablishmentExamIdentityBean[]> {
    return this.httpClient.get<EstablishmentExamIdentityBean[]>(this.API + "/establishment-exam-identity/list");
  }

  delete(id: number): Observable<EstablishmentExamIdentityBean> {
    return this.httpClient.delete<EstablishmentExamIdentityBean>(this.API + '/establishment-exam-identity/delete/' + id);
  }

  getOne(id: number): Observable<EstablishmentExamIdentityBean> {
    return this.httpClient.get<EstablishmentExamIdentityBean>(this.API + "/establishment-exam-identity/info/" + id);
  }

  constructor(private httpClient: HttpClient, private appConfigsService: AppConfigsService) { }
}

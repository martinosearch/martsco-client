import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';

@Injectable({
  providedIn: 'root'
})

export class UserTypeService {

  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient, private appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_MARTSCO + '/user-type/list');
  }

  getOne(id: any): Observable<any> {
    return this.httpClient.get<any>(this.API_MARTSCO + '/user-type/info/' + id);
  }

  getOneByDim(id: any): Observable<any> {
    return this.httpClient.get<any>(this.API_MARTSCO + '/user-type/info-by-dim/' + id);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.API_MARTSCO + '/user-type/save', data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.API_MARTSCO + '/user-type/delete/' + id);
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }
}

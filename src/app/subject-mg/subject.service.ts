import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AppConfigsService } from '../utilities/services/app-configs.service';
import { RouteService } from '../utilities/services/route.service';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public types = [];
  public currentObj: any;
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService, public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_MARTSCO + '/subject/list');
  }

  getOne(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_MARTSCO + '/subject/info/' + id);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.API_MARTSCO + '/subject/save', data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.API_MARTSCO + '/subject/delete/' + id);
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

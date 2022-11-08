import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { RouteService } from 'src/app/utilities/services/route.service';

@Injectable({
  providedIn: 'root'
})
export class DecoupageService {

  public currentObj: any;
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService, public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_MARTSCO + '/decoupage/list');
  }

  c
  getOne(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.API_MARTSCO}/decoupage/info/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.API_MARTSCO + '/decoupage/save', data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(`${this.API_MARTSCO}/decoupage/delete/${id}`);
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }

  refresh() {
    this.getAll();
  }

  setCurrentObject(obj: any) {
    this.currentObj = obj;
  }

  getCurrentObject(): Observable<any> {
    return of(this.currentObj);
  }
}


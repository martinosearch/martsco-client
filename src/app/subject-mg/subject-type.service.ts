import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RouteService } from '../utilities/services/route.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectTypeService {
  public types = [];
  public currentObj: any;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.routeService.subjectTypeListUrl);
  }

  getOne(id: number): Observable<any> {
    return this.httpClient.get<any>(this.routeService.subjectTypeInfoUrl + id);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.routeService.subjectTypeSaveUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.routeService.subjectTypeDeleteUrl + id);
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RouteService } from './route.service';



@Injectable({
  providedIn: 'root'
})
export class EventAppService {
  public currentObj: any;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.routeService.eventListeUrl);
  }

  getOne(id: any): Observable<any> {
    return this.httpClient.get<any>(this.routeService.eventInfoUrl + id);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.routeService.eventSaveUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.routeService.eventDeleteUrl + id);
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

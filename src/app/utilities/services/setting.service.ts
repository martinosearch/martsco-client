import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setting } from '../models/setting';
import { RouteService } from './route.service';


@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public types = [];

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.routeService.settingListeUrl);
  }

  getOne(id: any): Observable<Setting> {
    return this.httpClient.get<Setting>(this.routeService.settingInfoUrl + id);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(
      this.routeService.settingSaveUrl,
      data
    );
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.routeService.settingDeleteUrl + id);
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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { RouteService } from '../../utilities/services/route.service';

@Injectable({
  providedIn: 'root'
})
export class MinistaryService {
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient, public routeService: RouteService,
    public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_MARTSCO}/ministary/list`);
  }

  getOne(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.API_MARTSCO}/ministary/info/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API_MARTSCO}/ministary/save`, data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(`${this.API_MARTSCO}/ministary/delete/` + id);
  }
}

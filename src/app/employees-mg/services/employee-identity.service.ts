import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RouteService } from '../../utilities/services/route.service';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { UserTypeService } from 'src/app/utilities/services/user-type.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeIdentityService {
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient, public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_MARTSCO}/employee/list`);
  }

  getOne(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.API_MARTSCO}/employee/info/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API_MARTSCO}/employee/save`, data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(`${this.API_MARTSCO}/employee/delete/${id}`);
  }

}

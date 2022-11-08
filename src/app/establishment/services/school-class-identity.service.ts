import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectAttribution } from 'src/app/subject-mg/models/subject-attribution';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { RouteService } from '../../utilities/services/route.service';
import { SchoolClassIdentityBean } from '../models/school-class-identity-bean';
import { SchoolClassSettingBean } from '../models/school-class-setting-bean';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassIdentityService {

  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;
  public types = [];
  public currentObj: any;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService, public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<SchoolClassIdentityBean[]> {
    return this.httpClient.get<SchoolClassIdentityBean[]>(this.API_MARTSCO + '/school-class/list');
  }

  getOne(id: number): Observable<SchoolClassIdentityBean> {
    return this.httpClient.get<SchoolClassIdentityBean>(this.API_MARTSCO + '/school-class/info/' + id);
  }

  save(data: any): Observable<SchoolClassIdentityBean> {
    return this.httpClient.post<SchoolClassIdentityBean>(this.API_MARTSCO + '/school-class/save', data);
  }

  delete(id: any): Observable<SchoolClassIdentityBean> {
    return this.httpClient.delete<SchoolClassIdentityBean>(this.API_MARTSCO + '/school-class/delete/' + id);
  }
}

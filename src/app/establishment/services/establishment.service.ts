import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { RouteService } from '../../utilities/services/route.service';
import { EstablishmentIdentityBean } from '../models/establishment-identity-bean';
import { EstablishmentImageBean } from '../models/establishment-image-bean';
import { EstablishmentSettingBean } from '../models/establishment-setting-bean';


@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;
  public currentObj: any;


  constructor(
    public httpClient: HttpClient, private appConfigsService: AppConfigsService,
    public routeService: RouteService
  ) { }

  getAll(): Observable<EstablishmentIdentityBean[]> {
    return this.httpClient.get<EstablishmentIdentityBean[]>(this.API_MARTSCO + '/establishment-identity/list');
  }

  getOne(id: any): Observable<EstablishmentIdentityBean> {
    return this.httpClient.get<EstablishmentIdentityBean>(this.API_MARTSCO + '/establishment-identity/info/' + id);
  }

  getThisEstablishment(): Observable<EstablishmentIdentityBean> {
    return this.httpClient.get<EstablishmentIdentityBean>(this.API_MARTSCO + '/establishment-identity/my-agency');
  }

  save(data: any): Observable<EstablishmentIdentityBean> {
    return this.httpClient.post<EstablishmentIdentityBean>(this.API_MARTSCO + '/establishment-identity/save', data);
  }

  delete(id: any): Observable<EstablishmentIdentityBean> {
    return this.httpClient.delete<EstablishmentIdentityBean>(this.API_MARTSCO + '/establishment-identity/delete/' + id);
  }

  getSettingBean(id: number): Observable<EstablishmentSettingBean> {
    return this.httpClient.get<EstablishmentSettingBean>(this.API_MARTSCO + '/establishment-setting/info/' + id);
  }

  saveSettingBean(data: any): Observable<EstablishmentSettingBean> {
    return this.httpClient.post<EstablishmentSettingBean>(this.API_MARTSCO + '/establishment-setting/save', data);
  }

  getImageBean(id: number): Observable<EstablishmentImageBean> {
    return this.httpClient.get<EstablishmentImageBean>(this.API_MARTSCO + '/establishment-image/info/' + id);
  }

  saveImageBean(data: any): Observable<EstablishmentImageBean> {
    return this.httpClient.post<EstablishmentImageBean>(this.API_MARTSCO + '/establishment-image/save', data);
  }
}

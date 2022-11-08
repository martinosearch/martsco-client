import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { RouteService } from '../../utilities/services/route.service';
import { CountryIdentityBean } from '../models/country-identity-bean';
import { CountryImageBean } from '../models/country-image-bean';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient, public routeService: RouteService,
    public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<CountryIdentityBean[]> {
    return this.httpClient.get<CountryIdentityBean[]>(`${this.API_MARTSCO}/country-identity/list`);
  }

  getOne(id: number): Observable<CountryIdentityBean> {
    return this.httpClient.get<CountryIdentityBean>(`${this.API_MARTSCO}/country-identity/info/${id}`);
  }

  save(data: any): Observable<CountryIdentityBean> {
    return this.httpClient.post<CountryIdentityBean>(`${this.API_MARTSCO}/country-identity/save`, data);
  }

  delete(id: number): Observable<CountryIdentityBean> {
    return this.httpClient.delete<CountryIdentityBean>(`${this.API_MARTSCO}/country-identity/delete/` + id);
  }

  saveImageBean(modelImage: CountryImageBean): Observable<CountryImageBean> {
    return this.httpClient.post<CountryImageBean>(`${this.API_MARTSCO}/country-image/save`, modelImage);
  }
  getImageBean(id: number): Observable<CountryImageBean> {
    return this.httpClient.get<CountryImageBean>(`${this.API_MARTSCO}/country-image/info/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicStandardSetting } from '../../evaluation-trim/models/academic-standard-setting';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { RouteService } from '../../utilities/services/route.service';
import { AcademicStandardSettingBean as AcademicStandardSettingBean } from '../../evaluation-trim/models/academic-standard-setting-bean';
import { AcademicStandardIdentityBean } from '../models/academic-standard-identity-bean';
import { CoefAttribution } from 'src/app/evaluation-trim/models/coef-attribution';

@Injectable({
  providedIn: 'root'
})
export class AcademicStandardService {
  public types = [];
  public currentObj: any;
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService,
    public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_MARTSCO + '/academic-standard/list');
  }

  getOne(id: number): Observable<any> {
    return this.httpClient.get<AcademicStandardIdentityBean>(this.API_MARTSCO + '/academic-standard/info/' + id);
  }

  getAcademicStandardBullResultModel(id: number): Observable<AcademicStandardSettingBean> {
    return this.httpClient.get<AcademicStandardSettingBean>(this.API_MARTSCO + '/academic-standard-settings/info/' + id);
  }

  saveIdentity(data: AcademicStandardIdentityBean): Observable<AcademicStandardIdentityBean> {
    return this.httpClient.post<AcademicStandardIdentityBean>(this.API_MARTSCO + '/academic-standard/save', data);
  }

  saveSettings(data: AcademicStandardSettingBean): Observable<AcademicStandardSettingBean> {
    return this.httpClient.post<AcademicStandardSettingBean>(this.API_MARTSCO + '/academic-standard-settings/save', data);
  }

  delete(id: any): Observable<AcademicStandardIdentityBean> {
    return this.httpClient.delete<AcademicStandardIdentityBean>(this.API_MARTSCO + '/academic-standard/delete/' + id);
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }

  getCurrentSetting(standardSettingBean: AcademicStandardSettingBean, yearId: number): Observable<AcademicStandardSetting> {
    return new Observable((observer) => {
      const result = standardSettingBean.settings.filter(set => set.year.id === yearId)[0];

      observer.next(result);
    });
  }

  findCoefForThisYear(settingBean: AcademicStandardSettingBean, yearId: number): Observable<CoefAttribution[]> {
    return new Observable((observer => {
      const rest = settingBean.coefAttributions
        .filter(attrib => (attrib.year.id === yearId));

      observer.next(rest);
    }));
  }

  findCoefsForOtherYear(settingBean: AcademicStandardSettingBean, yearId: number): Observable<CoefAttribution[]> {
    return new Observable((observer => {
      const rest = settingBean.coefAttributions.filter(attrib => (attrib.year.id !== yearId));
      observer.next(rest);
    }));
  }
}

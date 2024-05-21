import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { SubjectAttribution } from 'src/app/subject-mg/models/subject-attribution';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { RouteService } from 'src/app/utilities/services/route.service';
import { SchoolClassEvaluationBean } from '../models/school-class-evaluation-bean';
import { SchoolClassSettingBean } from '../models/school-class-setting-bean';
import { SchoolClassSubjectBean } from '../models/school-class-subject-bean';
import { AcademicStandardService } from './academic-standard.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassSettingService {


  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;
  public currentObj: any;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService, public appConfigsService: AppConfigsService,
    public typeService: AcademicStandardService
  ) { }

  findOne(schoolClassId: number): Observable<SchoolClassSettingBean> {
    return this.httpClient.get<SchoolClassSettingBean>(this.API_MARTSCO + '/school-class-settings/info/' + schoolClassId);
  }

  findSubjAttributions(bean: SchoolClassSubjectBean, yearId: number): Observable<SubjectAttribution[]> {
    return new Observable((observer) => {
      const rst = bean.subjectAttributions.filter(item => item.year.id === yearId);

      observer.next(rst);
    });
  }

  findCurrentSetting(settingBean: SchoolClassSettingBean, currentYearId: number): Observable<EmployeeIdentityBean> {
    return new Observable((observer) => {
      let employee = null;
      for (const tit of settingBean.titulaires) {
        if (tit.year.id === currentYearId) {
          employee = tit.employee;
        }
      }

      observer.next(employee);
    });
  }

  findEvaluationBean(schoolClassId: number): Observable<SchoolClassEvaluationBean> {
    return this.httpClient.get<SchoolClassEvaluationBean>(this.API_MARTSCO +
      '/school-class-evaluation/info/' + schoolClassId);
  }

  findSubjectBean(schoolClassId: number): Observable<SchoolClassSubjectBean> {
    return this.httpClient.get<SchoolClassSubjectBean>(this.API_MARTSCO +
      '/school-class-subject/info/' + schoolClassId);
  }

  saveSettings(modelSetting: SchoolClassSettingBean): Observable<SchoolClassSettingBean> {
    return this.httpClient.post<SchoolClassSettingBean>(this.API_MARTSCO +
      '/school-class-settings/save', modelSetting);
  }

  saveEvaluationSettingBean(settingBean: SchoolClassEvaluationBean): Observable<SchoolClassEvaluationBean> {
    return this.httpClient.post<SchoolClassEvaluationBean>(this.API_MARTSCO +
      '/school-class-evaluation/save', settingBean);
  }

  saveSubjectBean(subjectBean: SchoolClassSubjectBean): Observable<SchoolClassSubjectBean> {
    return this.httpClient.post<SchoolClassSubjectBean>(this.API_MARTSCO +
      '/school-class-subject/save', subjectBean);
  }

}

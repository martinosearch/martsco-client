import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Year } from 'src/app/establishment/models/year';
import { SchoolClassIdentityBean } from 'src/app/establishment/models/school-class-identity-bean';
import { ConstanceService } from 'src/app/utilities/services/constance.service';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { EffectifBean } from '../models/effectif-bean';
import { StudentCursusBean } from '../models/studentCursusBean';
import { StudentIdentityBean } from '../models/studentIdentityBean';

@Injectable({
  providedIn: 'root'
})
export class StudentIdentityService {


  private API_MARTSCO = this.appConfigsService.apiUrl;
  currentYear: Year;

  constructor(public appConfigsService: AppConfigsService, public httpClient: HttpClient) {

  }

  getAll(): Observable<StudentIdentityBean[]> {
    return this.httpClient.get<StudentIdentityBean[]>(`${this.API_MARTSCO}/student-identity/list`);
  }

  getOne(studentId: number): Observable<StudentIdentityBean> {
    return this.httpClient.get<StudentIdentityBean>(`${this.API_MARTSCO}/student-identity/info/${studentId}`);
  }

  delete(studentId: number): Observable<StudentIdentityBean> {
    return this.httpClient.delete<StudentIdentityBean>(`${this.API_MARTSCO}/student-identity/delete/${studentId}`);
  }

  save(student: StudentIdentityBean, schoolClass: SchoolClassIdentityBean): Observable<StudentIdentityBean> {
    let body = { schoolClass: schoolClass, student: student };

    console.log("body" + JSON.stringify(body));
    return this.httpClient.post<StudentIdentityBean>(`${this.API_MARTSCO}/student-identity/save`, body);
  }

  getStudentIdentities(studentCursusBeans: StudentCursusBean[]): Observable<StudentIdentityBean[]> {
    return this.httpClient.post<StudentIdentityBean[]>(this.API_MARTSCO + "/student-identity/list-identities", studentCursusBeans);
  }

  getEffectifBeans(yearId: number): Observable<EffectifBean[]> {
    const url = this.API_MARTSCO + "/student-identity/effectifs-beans/" + yearId;
    return this.httpClient.get<EffectifBean[]>(url);
  }

  getTotalEffectifBean(yearId: number): Observable<EffectifBean> {
    const url = this.API_MARTSCO + "/student-identity/total-effectif-bean/" + yearId;
    return this.httpClient.get<EffectifBean>(url);
  }

  getNthRegistered(yearId: number, nthRegistered: number): Observable<StudentIdentityBean[]> {
    return this.httpClient.get<StudentIdentityBean[]>(this.API_MARTSCO + "/student-identity/nth-registered/" + yearId + "/" + nthRegistered);
  }

  getIdentityBean(identities: StudentIdentityBean[], studentId: number) {
    return identities.filter(st => st.id === studentId)[0];
  }
}

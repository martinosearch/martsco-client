import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Year } from 'src/app/establishment/models/year';
import { Passport } from 'src/app/id-card-mg/models/passport';
import { StudentPassportBean } from 'src/app/id-card-mg/models/studentPassportBean';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { StudentIdentityBean } from '../models/studentIdentityBean';
import { StudentIdentityService } from './student-identity.service';

@Injectable({
  providedIn: 'root'
})
export class StudentPassportService {

  API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(private appConfigsService: AppConfigsService, private httpClient: HttpClient) { }

  getCurrentPassport(studentId: number, currentYearId: number): Observable<Passport> {
    return this.httpClient.get<Passport>(this.API_MARTSCO + "/student-passport/current-passport/"
      + studentId + "/" + currentYearId);
  }

  save(studentIdentityBean: StudentIdentityBean, year: Year, passport: Passport)
    : Observable<StudentPassportBean> {
    const body = { "studentIdentityBean": studentIdentityBean, "year": year, "passport": passport };

    return this.httpClient.post<StudentPassportBean>(this.API_MARTSCO
      + "/student-passport/save/", body);
  }
}

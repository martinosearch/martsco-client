import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { EmployeeAuth } from '../models/employee-auth';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthService {

  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(private appConfigsService: AppConfigsService, public httpClient: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<EmployeeAuth[]>(`${this.API_MARTSCO}/employee-auth/list`);
  }

  getOne(id: number) {
    return this.httpClient.get<EmployeeAuth>(`${this.API_MARTSCO}/employee-auth/info/${id}`);
  }
}

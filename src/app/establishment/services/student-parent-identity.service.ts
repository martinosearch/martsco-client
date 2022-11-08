import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';

@Injectable({
  providedIn: 'root'
})
export class StudentParentIdentityService {
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient, public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_MARTSCO}/student-parent/list`);
  }

  getOne(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.API_MARTSCO}/student-parent/info/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API_MARTSCO}/student-parent/save`, data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(`${this.API_MARTSCO}/student-parent/delete/${id}`);
  }

}

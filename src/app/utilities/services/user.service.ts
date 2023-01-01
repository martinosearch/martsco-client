import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(private appConfigsService: AppConfigsService, public httpClient: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<AppUser[]>(`${this.API_MARTSCO}/user/list`);
  }

  getOne(id: number) {
    return this.httpClient.get<AppUser>(`${this.API_MARTSCO}/user/info/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.API_MARTSCO + '/user/save', data);
  }
}

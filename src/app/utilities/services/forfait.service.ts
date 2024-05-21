import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigsService } from 'src/app/utilities/services/app-configs.service';

@Injectable({
  providedIn: 'root'
})
export class ForfaitService {
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient,
    public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_MARTSCO + '/forfait/list');
  }

  getOne(id: any): Observable<any> {
    return this.httpClient.get<any>(this.API_MARTSCO + '/forfait/info/' + id);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.API_MARTSCO + '/forfait/save', data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.API_MARTSCO + '/forfait/delete/' + id);
  }

  getCurrentForfait(): Observable<any> {
    return this.httpClient.get<any>(this.API_MARTSCO + '/forfait/current-forfait');
  }

  getEstablishmentSerial(): Observable<string> {
    return this.httpClient.get(this.API_MARTSCO + '/forfait/establishment-serial', { responseType: 'text' });
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }
}

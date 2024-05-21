import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RouteService } from 'src/app/utilities/services/route.service';
import { AppConfigsService } from '../../utilities/services/app-configs.service';


@Injectable({
  providedIn: 'root'
})
export class ReductionMotifService {
  public currentObj: any;
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient, public appConfigsService: AppConfigsService,
    public routeService: RouteService
  ) { }


  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_MARTSCO + '/reduction-motive/list');
  }

  getOne(id: any): Observable<any> {
    return this.httpClient.get<any>(this.API_MARTSCO + '/reduction-motive/info/' + id);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.API_MARTSCO + '/reduction-motive/save', data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.API_MARTSCO + '/reduction-motive/delete/' + id);
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }

  refresh() {
    this.getAll();
  }
}

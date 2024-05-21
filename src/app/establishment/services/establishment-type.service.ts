import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RouteService } from '../../utilities/services/route.service';


@Injectable({
  providedIn: 'root'
})
export class EstablishmentTypeService {
  public currentObj: any;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.routeService.establishmentTypeListeUrl);
  }

  getOne(id: number): Observable<any> {
    return this.httpClient.get<any>(this.routeService.establishmentTypeInfoUrl + id);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.routeService.establishmentTypeSaveUrl, data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.routeService.establishmentTypeDeleteUrl + id);
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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { RouteService } from '../../utilities/services/route.service';
import { ResultAnnuelData } from '../models/result-annuel-data';

@Injectable({
  providedIn: 'root'
})
export class ResultAnnuelDataService {
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(public httpClient: HttpClient, public routeService: RouteService,
    public appConfigsService: AppConfigsService) { }

  getAllAdmis(yearId: number, schoolClassId: number): Observable<ResultAnnuelData[]> {
    return this.httpClient.get<ResultAnnuelData[]>(this.API_MARTSCO +
      "/result-annuel/list-admis/" + yearId + "/" + schoolClassId);
  }

  getAllAjournes(yearId: number, schoolClassId: number): Observable<ResultAnnuelData[]> {
    return this.httpClient.get<ResultAnnuelData[]>(this.API_MARTSCO +
      "/result-annuel/list-ajournes/" + yearId + "/" + schoolClassId);
  }
}

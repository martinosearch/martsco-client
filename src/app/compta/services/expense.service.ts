import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AppConfigsService } from '../../utilities/services/app-configs.service';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;
  public currentObj: any;

  constructor(
    public httpClient: HttpClient, public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_MARTSCO + '/expense/list');
  }

  getAllByYear(yearId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_MARTSCO + '/expense/list' + '/' + yearId);
  }

  getOne(id: any): Observable<any> {
    return this.httpClient.get<any>(this.API_MARTSCO + '/expense/info/' + id);
  }

  getAmountByClass(expenseId: number, standardId: number, yearId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_MARTSCO + '/expense/info/' + expenseId + '/' + standardId + '/' + yearId);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.API_MARTSCO + '/expense/save', data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.API_MARTSCO + '/expense/delete/' + id);
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

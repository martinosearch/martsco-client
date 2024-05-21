import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EvaluationSetting } from '../models/evaluation-setting';
import { Mark } from '../models/mark';
import { AppConfigsService } from '../../utilities/services/app-configs.service';
import { RouteService } from '../../utilities/services/route.service';
import { MarkData } from './student-evaluation.service';
import { Evaluation } from '../models/evaluation';
import { Year } from 'src/app/establishment/models/year';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  public types = [];
  public currentObj: any;
  // api url
  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(
    public httpClient: HttpClient,
    public routeService: RouteService, public appConfigsService: AppConfigsService
  ) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_MARTSCO + '/evaluation/list');
  }

  getOne(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_MARTSCO + '/evaluation/info/' + id);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.API_MARTSCO + '/evaluation/save', data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(this.API_MARTSCO + '/evaluation/delete/' + id);
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, ms);
    });
  }

  findEvaluationSettings(schoolClassId: number, yearId: number): Observable<EvaluationSetting> {
    return this.httpClient.get<EvaluationSetting>(
      this.API_MARTSCO + "/evaluation/settings/" + schoolClassId + "/" + yearId);
  }

  findEvaluationSettingsByStandard(standardId: number, yearId: number): Observable<EvaluationSetting> {
    return this.httpClient.get<EvaluationSetting>(
      this.API_MARTSCO + "/evaluation/settings-by-standard/" + standardId + "/" + yearId);
  }

  findNotesOf(studentId: number, evaluationId: number, subjectId: number, schoolId: number,
    standardId: number, yearId: number): Observable<Mark> {
    return this.httpClient.get<Mark>(
      this.API_MARTSCO + "/marks/find/" + studentId + "/" + evaluationId + "/" + subjectId
      + "/" + schoolId + "/" + standardId + "/" + yearId);
  }

  findAllEvaluationWithIndex(evaluations: Evaluation[], currentYear: Year, index: number): Observable<Evaluation[]> {
    return new Observable((observer) => {
      const rst = evaluations.filter((elmt: Evaluation) => (elmt.year.id === currentYear.id
        && elmt.decoupage.index === index));

      observer.next(rst);
    });
  }

  findEvaluationOfThisTrimestre(decoupageId: number, yearId: number): Observable<Evaluation[]> {
    return new Observable((observer) => {
      //filter to only evaluations of this trimestre
      this.getAll().subscribe(resp => {
        const evaluations = resp.filter(
          item => (item.decoupage.id === decoupageId
            && item.year.id === yearId)
        );

        observer.next(evaluations);
      });
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark } from 'src/app/evaluation-trim/models/mark';
import { StudentIdentityBean } from 'src/app/student-mg/models/studentIdentityBean';
import { StudentMarkBean } from '../models/student-mark-bean';
import { StudentCursusBean } from '../../student-mg/models/studentCursusBean';
import { AppConfigsService } from '../../utilities/services/app-configs.service';

@Injectable({
  providedIn: 'root'
})
export class StudentEvaluationService {

  private API_MARTSCO = this.appConfigsService.apiUrl;

  constructor(public httpClient: HttpClient, public appConfigsService: AppConfigsService) {
  }

  saveMark(student: StudentMarkBean): Observable<StudentMarkBean> {
    //  console.log("markbean to save: " + JSON.stringify(student));
    return this.httpClient.post<any>(this.API_MARTSCO + "/marks/save", student);
  }

  findMark(evaluationId: number, subjectId: number, studentMarkBean: StudentMarkBean): Observable<number> {
    return new Observable((observer) => {
      const result = studentMarkBean.marks.filter(item => {
        // console.log("mark:" + JSON.stringify(item));
        if (item.evaluation !== null
          || item.subject !== null) {
          if (
            item.evaluation.id === evaluationId
            && item.subject.id === subjectId
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })[0];

      const value = result !== undefined ? result.value : undefined;
      observer.next(value);
    });
  }

  findAllByClass(studentOfThisClass: StudentCursusBean[]): Observable<StudentMarkBean[]> {
    return this.httpClient.post<StudentMarkBean[]>(this.API_MARTSCO + "/marks/find-all-by-class",
      studentOfThisClass);
  }
}

export class MarkData {
  student: StudentIdentityBean;
  notes: Mark[];
}

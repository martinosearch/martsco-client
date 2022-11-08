import { ObserversModule } from '@angular/cdk/observers';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Year } from '../../establishment/models/year';
import { StudentCursusService } from '../../student-mg/services/student-cursus.service';
import { ConstanceService } from '../services/constance.service';

@Pipe({ name: 'currentClass' })
export class CurrentClass implements PipeTransform {
  currentYear: Year;
  constructor(private studentCursusService: StudentCursusService,
    private constanceService: ConstanceService) {
    constanceService.currentYearSubject.subscribe((resp) => {
      this.currentYear = resp;
    });
  }

  transform(id: number): Observable<string> {
    return new Observable((observer) => {
      this.studentCursusService.getCurrentCursus(id, this.currentYear.id).subscribe((resp) => {
        if (resp !== null) {
          observer.next(resp.schoolClass.designation);
        } else {
          observer.next("");
        }
      });
    });
  }
}

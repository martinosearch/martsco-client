import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentCursus } from '../models/student-cursus';
import { StudentCursusBean } from '../models/studentCursusBean';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {
  constructor() { }

  findCursuses(filteredCursuses: StudentCursusBean[], id: number): StudentCursus[] {
    const student = filteredCursuses.filter((item) => item.id === id)[0];
    return student.cursuses;
  }
}

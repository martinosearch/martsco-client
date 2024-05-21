import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamRoutesService {
  examListRoutes = "/exam/list";
  subjectListRoutes = "/subject-exam/list";
  establishementListRoutes = "/establishment-exam-identity/list";
  candidateListRoutes = "candidate/list";;
  constructor() { }
}

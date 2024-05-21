import { ExamNational } from 'src/app/establishment/models/exam-national';
import { Decoupage } from '../../establishment/models/decoupage';
import { DecoupageType } from '../../establishment/models/decoupage-type';
import { Year } from '../../establishment/models/year';

export class AcademicStandardSetting {
  year: Year;
  bullModelId = 4;
  idCardModelId = 2;
  facultativeComputeId = 1;


  showDirectorName = true;
  showPrincipalName = true;
  showDateConseil = true;
  showDecisionConseil = true;

  moyennePassage1 = 10;
  moyennePassage2 = 10;
  moyennePassage3 = 10;
  moyennePassageAn = 10;

  dateConseil1 = new Date(Date.now());
  dateConseil2 = new Date(Date.now());
  dateConseil3 = new Date(Date.now());

  decoupageType: DecoupageType;
  lastestDecoupage: Decoupage;

  isClassExam = false;
  examNational: ExamNational;
  typeFacultativeId: number;
}

import { Evaluation } from 'src/app/evaluation-trim/models/evaluation';
import { MySubject } from '../../subject-mg/models/subject';

export class Mark {
  evaluation: Evaluation;
  subject: MySubject;
  value: number;

  constructor(evaluation: Evaluation, subject: MySubject, value: number) {
    this.evaluation = evaluation;
    this.subject = subject;
    this.value = value;
  }
}

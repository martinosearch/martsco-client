import { MySubject } from "src/app/subject-mg/models/subject";

export class MarkExam {
  subject: MySubject;
  value: number;

  constructor(private subj: MySubject, private val: number) {
    this.subject = subj;
    this.value = val;
  }
}

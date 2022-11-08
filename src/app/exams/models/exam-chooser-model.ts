import { MySubject } from "src/app/subject-mg/models/subject";
import { EstablishmentExamIdentityBean } from "./exam-establishment-identity-bean";
import { ExamIdentityBean } from "./exam-identity-bean";

export class ExamChooserModel {
  subject: MySubject;
  exam: ExamIdentityBean;
  establishment: EstablishmentExamIdentityBean;
}

import { EstablishmentExamIdentityBean } from "./exam-establishment-identity-bean";
import { SubjectAttribExam } from "./subject-attrib-exam";

export class ExamSettingBean {
  id: number;
  subjectAttributions: SubjectAttribExam[] = [];
  responsableName: string;
  responsableTitle: string;
  showCandidateName = true;
  establishmentHost = new EstablishmentExamIdentityBean();
}

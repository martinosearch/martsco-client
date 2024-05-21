import { EstablishmentExamIdentityBean } from "./exam-establishment-identity-bean";
import { Room } from "./room";
import { SubjectAttribExam } from "./subject-attrib-exam";

export class ExamSettingBean {
  id: number;
  subjectAttributions: SubjectAttribExam[] = [];
  rooms: Room[] = [];

  responsableName: string;
  responsableTitle: string;
  showCandidateName = true;
  establishmentHost = new EstablishmentExamIdentityBean();
}

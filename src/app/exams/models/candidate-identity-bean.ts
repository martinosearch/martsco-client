import { EstablishmentExamIdentityBean } from "./exam-establishment-identity-bean";
import { ExamIdentityBean } from "./exam-identity-bean";
import { IdentityCandidate } from "./identity-candidate";
import { MarkExam } from "./mark-exam";

export class CandidateIdentityBean {
  id: number;
  identity = new IdentityCandidate();
  establishment = new EstablishmentExamIdentityBean();
  exam: ExamIdentityBean;
  marks: MarkExam[] = [];
  numTable: number = 0;
}

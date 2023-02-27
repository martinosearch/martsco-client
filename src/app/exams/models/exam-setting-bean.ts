import { SubjectAttribExam } from "./subject-attrib-exam";

export class ExamSettingBean {
  id: number;
  subjectAttributions: SubjectAttribExam[] = [];
  responsableName: string;
  responsableTitle: string;
  showCandidateName = true;
}

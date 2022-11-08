import { EvaluationSetting } from '../../evaluation-trim/models/evaluation-setting';
import { AcademicStandardIdentityBean } from './academic-standard-identity-bean';
import { SubjectAttribution } from '../../subject-mg/models/subject-attribution';
import { Titulaire } from './titulaire';

export class SchoolClassSettingBean {
  public id: number;
  public titulaires: Titulaire[] = [];
}

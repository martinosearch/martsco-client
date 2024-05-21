import { AcademicStandardSettingBean } from 'src/app/evaluation-trim/models/academic-standard-setting-bean';
import { Expense } from '../../compta/models/expense';
import { AcademicStandardIdentityBean } from './academic-standard-identity-bean';
import { EmployeeIdentityBean } from '../../employees-mg/models/employee-identity-bean';
import { SchoolClassIdentityBean } from './school-class-identity-bean';
import { MySubject } from '../../subject-mg/models/subject';
import { Decoupage } from './decoupage';
import { Year } from './year';

export class ClassChooserModel {
  titre: string;
  schoolClass: SchoolClassIdentityBean;
  year: Year;
  decoupage: Decoupage;
  subject: MySubject;
  standard: AcademicStandardIdentityBean;
  standardBullResultModel: AcademicStandardSettingBean;
  charge: EmployeeIdentityBean;
  selectedEvaluationId: number;
  expense: Expense;
  express: boolean;
}

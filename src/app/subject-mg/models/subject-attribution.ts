import { EmployeeIdentityBean } from '../../employees-mg/models/employee-identity-bean';
import { MySubject } from './subject';
import { Year } from '../../establishment/models/year';

export class SubjectAttribution {
  public year: Year;
  public employee: EmployeeIdentityBean;
  public subject: MySubject;
}

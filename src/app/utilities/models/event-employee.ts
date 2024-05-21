import { EmployeeIdentityBean } from '../../employees-mg/models/employee-identity-bean';

export class EventEmployee {
  id: number;
  description: string;
  date: Date;
  shouldBeCount: boolean;
  employee: EmployeeIdentityBean;
}

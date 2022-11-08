import { SchoolClassIdentityBean } from '../../establishment/models/school-class-identity-bean';
import { Year } from '../../establishment/models/year';

export class StudentCursus {
  year: Year;
  schoolClass: SchoolClassIdentityBean;
  schooling: number;
  status: string;
}

import { Passport } from 'src/app/id-card-mg/models/passport';
import { StudentCursus } from './student-cursus';

export class StudentCursusBean {
  id: number;
  cursuses: StudentCursus[] = [];
  passports: Passport[];
}

import { StudentCursus } from "./student-cursus";

export class StudentListModel {
  id: number;
  lastName: string;
  firstName: string;
  sex: number;
  age: number;
  email: string;
  tel1: string;
  tel2: string;
  numMatricule: string;
  entryDate: Date;
  cursuses: StudentCursus[];
}

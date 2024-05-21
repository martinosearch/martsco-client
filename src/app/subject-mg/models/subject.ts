import { SubjectType } from './subject-type';

export class MySubject {
  id: number;
  designation: string;
  dim: string;
  type = new SubjectType();
  orderSubj: number;
}

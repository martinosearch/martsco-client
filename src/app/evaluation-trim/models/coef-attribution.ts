import { MySubject } from '../../subject-mg/models/subject';
import { Year } from '../../establishment/models/year';

export class CoefAttribution {
  public year: Year;
  public subject: MySubject;
  public value = 1;
}

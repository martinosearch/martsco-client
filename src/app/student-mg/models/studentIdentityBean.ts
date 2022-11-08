import { ConxInfo } from '../../utilities/models/conx-info';
import { Address } from '../../establishment/models/address';
import { Identity } from '../../establishment/models/identity';
import { InscriptionInfo } from '../../establishment/models/inscription-info';
import { ProfessionInfo } from '../../establishment/models/profession-info';
import { StudentParentIdentity } from 'src/app/establishment/models/student-parent-identity';

export class StudentIdentityBean {
  id: number;
  identity = new Identity();
  address = new Address();
  conxInfo = new ConxInfo();
  inscriptionInfo = new InscriptionInfo();
  professionInfo = new ProfessionInfo();
  father = new StudentParentIdentity();
  mother = new StudentParentIdentity();
  tutor = new StudentParentIdentity();

  public define(): string {
    return this.identity.lastName + this.identity.firstName;
  }
}

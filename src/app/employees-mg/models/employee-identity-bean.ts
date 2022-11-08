import { EventEmployee } from '../../utilities/models/event-employee';
import { Address } from '../../establishment/models/address';
import { Identity } from '../../establishment/models/identity';
import { InscriptionInfo } from '../../establishment/models/inscription-info';
import { ProfessionInfo } from '../../establishment/models/profession-info';
import { CashRegistration } from '../../compta/models/cash-registration';
import { Signature } from '../../establishment/models/signature';

export class EmployeeIdentityBean {
  id: number;
  identity = new Identity();
  address = new Address();
  inscriptionInfo = new InscriptionInfo();
  professionInfo = new ProfessionInfo();
  employeeEvents: EventEmployee[];
  cashRegistrations: CashRegistration[];
  signature: Signature;
}

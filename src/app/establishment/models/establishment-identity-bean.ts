import { EstablishmentType } from './establishment-type';
import { IdentityEts } from './identity-ets';
import { Address } from './address';

export class EstablishmentIdentityBean {
  id: number;
  type: EstablishmentType;
  identity = new IdentityEts();
  address = new Address();
  isInThisGroup: boolean;
  isThisAgency: boolean;
  receiptSerialIndex: number;
  studentMatriculeIndex: number;
}

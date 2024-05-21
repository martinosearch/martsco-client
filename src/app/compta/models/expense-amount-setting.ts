import { AcademicStandardIdentityBean } from 'src/app/establishment/models/academic-standard-identity-bean';
import { Year } from '../../establishment/models/year';

export class ExpenseAmountSetting {
  standard: AcademicStandardIdentityBean;
  amount: number;
  amountMale: number;
  amountFemale: number;
  year: Year;
  isPayableByTranche = true;
  isBySex = false;
}

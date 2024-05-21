import { EmployeeIdentityBean } from 'src/app/employees-mg/models/employee-identity-bean';
import { Year } from '../../establishment/models/year';
import { Expense } from './expense';


export class Payment {
  year: Year;
  expense: Expense;
  cash: number;
  change: number;
  currentAmount: number;
  date: Date;
  modePayement: number;
  banque: string;
  chequeId: string;
  serial: number;
  cashRegister: EmployeeIdentityBean;
  isValid: boolean;
}

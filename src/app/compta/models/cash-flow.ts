import { EmployeeIdentityBean } from "src/app/employees-mg/models/employee-identity-bean";
import { CashRegistration } from "./cash-registration";

export class CashFlow {
  employeeIdentityBean: EmployeeIdentityBean;
  cashRegistrations: CashRegistration[];
  amount: number = 0;
}

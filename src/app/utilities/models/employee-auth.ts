import { ConxInfo } from "./conx-info";
import { UserType } from "./user-type";

export class EmployeeAuth {
  id: number;
  userType: UserType;
  conxInfo = new ConxInfo();
}

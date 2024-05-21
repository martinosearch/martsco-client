import { Year } from "src/app/establishment/models/year";
import { EstablishmentIdentityBean } from "src/app/establishment/models/establishment-identity-bean";
import { EstablishmentImageBean } from "src/app/establishment/models/establishment-image-bean";
import { SchoolClassIdentityBean } from "src/app/establishment/models/school-class-identity-bean";
import { Expense } from "./expense";
import { StudentPayementStatement } from "./student-payement-statement";

export class SchoolClassPayementStatement {
  establishmentIdentityBean: EstablishmentIdentityBean;
  establishmentImageBean: EstablishmentImageBean;
  schoolClassIdentityBean: SchoolClassIdentityBean;

  year: Year;
  expense: Expense;

  amountUnit: number;

  sumAmount: number;
  reduction: number;
  paid: number;
  leftPaid: number;
  perPaid: number;

  statements: StudentPayementStatement;
}

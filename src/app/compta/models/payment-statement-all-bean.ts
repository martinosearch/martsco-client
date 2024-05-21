import { SchoolClassPayementStatement } from "./school-class-payement-statement";

export class PaymentStatementAllSchoolClassBean {
  statements: SchoolClassPayementStatement[];

  sumAmount: number;
  reduction: number;
  paid: number;
  leftPaid: number;
  perPaid: number;
}

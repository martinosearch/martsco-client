import { AcademicStandardIdentityBean } from "src/app/establishment/models/academic-standard-identity-bean";
import { Year } from "src/app/establishment/models/year";

export class ExpenseTrancheSetting {
    standard: AcademicStandardIdentityBean;
    amount: number;
    date: Date;
    year: Year;
}

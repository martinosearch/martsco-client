import { StudentIdentityBean } from "src/app/student-mg/models/studentIdentityBean";
import { ConxInfo } from "src/app/utilities/models/conx-info";
import { Address } from "./address";
import { ProfessionInfo } from "./profession-info";
import { StudentParentIdentity } from "./student-parent-identity";

export class StudentParentIdentityBean {
  id: number;
  identity = new StudentParentIdentity();
  address = new Address();
  conxInfo = new ConxInfo();
  profInfo = new ProfessionInfo();
  studentsForThatIsFather: StudentIdentityBean[] = [];
  studentsForThatIsMother: StudentIdentityBean[] = [];
  studentsForThatIsTutor: StudentIdentityBean[] = []
}

import { Year } from "../../establishment/models/year";

export class Passport {
  year: Year;
  namePassport: string;
  contentTypePassport: string;
  fileAsBase64Passport = "";
  sizePassport: number;
}

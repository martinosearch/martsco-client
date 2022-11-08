import { Identity } from "src/app/establishment/models/identity";
import { UserType } from "./user-type";

export class AppUser {
  login: string;
  password: string;
  isAuth: boolean;
  id: number;
  userType: UserType;
  wasPersonnalized = false;
  identity: Identity;
}

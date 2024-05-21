import { UserType } from './user-type';

export class ConxInfo {
    // connection properties
    login: string;
    password: string;
    remainTime: number;
    isAuth = false;
    userType: UserType;
    lastConnexionDate: Date;
    wasPersonnalized = false;
}

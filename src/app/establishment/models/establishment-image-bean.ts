import { LogoEnteteEstablishment } from "./logo-entete-establishment";
import { LogoFondEstablishment } from "./logo-fond-establishment";
import { Stamp } from "./stamp";

export class EstablishmentImageBean {
  id: number;
  logoEntete: LogoEnteteEstablishment;
  logoFond: LogoFondEstablishment;
  stamp: Stamp;
}

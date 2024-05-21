import { Armoirie } from "src/app/establishment/models/armoirie";
import { Flag } from "src/app/establishment/models/flag";

export class CountryImageBean {
  id: number;
  flag = new Flag();
  armoirie = new Armoirie();
}

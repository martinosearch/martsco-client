import { Year } from '../../establishment/models/year';

export class Setting {
  public key: string;
  public value: string;
  public year: Year;

  constructor(key: string, value?: string) {
    this.key = key;
    this.value = value;
  }
}

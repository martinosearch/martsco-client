import { Decoupage } from '../../establishment/models/decoupage';
import { Year } from '../../establishment/models/year';
import { EvaluationType } from './evaluation-type';

export class Evaluation {
  id: number;
  designation: string;
  year = new Year();
  decoupage = new Decoupage();
  type = new EvaluationType();
}

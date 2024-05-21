import { Evaluation } from './evaluation';
import { EvaluationTypeSetting } from './evaluation-type-setting';

export class EvaluationType {
    id: number;
    designation: string;
    settings: EvaluationTypeSetting[] = [];
    evaluations: Evaluation[] = [];
}

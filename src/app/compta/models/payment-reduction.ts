import { Year } from '../../establishment/models/year';
import { Expense } from './expense';
import { ReductionMotif } from './reduction-motif';

export class PaymentReduction {
    year: Year;
    expense: Expense;
    amount: number;
    motive: ReductionMotif;
}

import { ExpenseAmountSetting } from './expense-amount-setting';
import { ExpenseTrancheSetting } from './expense-tranche-setting';

export class Expense {
    id: number;
    designation: string;
    code: string;
    amountSettings: ExpenseAmountSetting[] = [];
    trancheSettings: ExpenseTrancheSetting[] = [];
}

import { Payment } from "./payment";

export class CashRegistration {
  expenseId: number;
  expenseDesignation: string;
  amount: number;
  payments: Payment[];
}

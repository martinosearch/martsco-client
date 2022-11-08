import { Payment } from './payment';
import { PaymentReduction } from './payment-reduction';

export class StudentComptaBean {
  id: number;
  payments: Payment[] = [];
  reductions: PaymentReduction[] = [];
}

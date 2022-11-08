import { ForfaitConso } from './forfait-conso';
export class Forfait {
    id: number;
    code: string;
    initialAmount: number;
    remainAmount: number;
    activationDate = new Date();
    forfaitConsommations: ForfaitConso[] = [];
    expirationDate = new Date();
    costMinute = 0;
}

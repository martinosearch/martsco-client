import { EstablishmentIdentityBean } from './establishment-identity-bean';

export class EstablishmentType {
    public id: number;
    public designation: string;
    public dim: string;
    public establishments: EstablishmentIdentityBean[];
}

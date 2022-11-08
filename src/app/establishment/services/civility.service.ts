import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CivilityService {
  public civilities = [
    { id: 1, intitule: 'Monsieur', code: 'M.' },
    { id: 2, intitule: 'Mademoiselle', code: 'Mlle' },
    { id: 3, intitule: 'Madame', code: 'Mme' },
    { id: 4, intitule: 'Docteur', code: 'Dr' },
    { id: 5, intitule: 'Infirmier', code: 'Inf.' },
    { id: 6, intitule: 'Inspecteur', code: 'Insp.' },
    { id: 7, intitule: 'Maître', code: 'Me' }
  ];

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComptaRouteService {
  cashRegisterFormRoute = '/mycash-register/form';
  cashRegisterBalance = '/cash-register-balance/show';

  constructor() { }
}

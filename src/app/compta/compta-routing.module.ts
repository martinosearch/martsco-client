import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegisterBalanceComponent } from 'src/app/compta/cash-register-balance/cash-register-balance.component';

const routes: Routes = [
  { path: 'cash-register-balance/show', component: CashRegisterBalanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ComptaRoutingModule { }

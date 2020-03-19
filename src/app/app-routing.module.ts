import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LimitesComponent} from './components/limites/limites.component';
import {VarHistoricoComponent} from './components/var-historico/var-historico.component';


const routes: Routes = [
  { path: 'limites', component: LimitesComponent },
  { path: 'var/historico', component: VarHistoricoComponent },
  { path: '**' , pathMatch: 'full' , redirectTo: 'var/historico'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

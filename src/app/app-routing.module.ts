import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LimitesComponent} from './components/limites/limites.component';
import {VarHistoricoComponent} from './components/var-historico/var-historico.component';


const routes: Routes = [
  { path: 'limites', component: LimitesComponent },
  { path: 'limites2', component: VarHistoricoComponent },
  { path: '**' , pathMatch: 'full' , redirectTo: 'limites'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

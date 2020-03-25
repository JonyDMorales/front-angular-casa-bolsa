import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LimitesComponent} from './components/limites/limites.component';
import {VarHistoricoComponent} from './components/var-historico/var-historico.component';
import {SemaforosComponent} from './components/semaforos/semaforos.component';
import {LogaritmoComponent} from './components/logaritmo/logaritmo.component';


const routes: Routes = [
  {path: 'limites', component: LimitesComponent},
  {path: 'var/historico', component: VarHistoricoComponent},
  {path: 'semaforos', component: SemaforosComponent},
  {path: 'logaritmo', component: LogaritmoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'var/historico'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

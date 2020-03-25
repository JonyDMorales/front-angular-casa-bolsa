import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LimitesComponent } from './components/limites/limites.component';
import { VarHistoricoComponent } from './components/var-historico/var-historico.component';
import {SemaforosComponent} from './components/semaforos/semaforos.component';
import {ChartsModule} from 'ng2-charts';
import { LogaritmoComponent } from './components/logaritmo/logaritmo.component';

@NgModule({
  declarations: [
    AppComponent,
    LimitesComponent,
    VarHistoricoComponent,
    SemaforosComponent,
    LogaritmoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

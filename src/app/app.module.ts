import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LimitesComponent } from './components/limites/limites.component';
import { VarHistoricoComponent } from './components/var-historico/var-historico.component';

@NgModule({
  declarations: [
    AppComponent,
    LimitesComponent,
    VarHistoricoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

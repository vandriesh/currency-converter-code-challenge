import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterModule } from './converter/converter.module';
import { HistoryModule } from './history/history.module';
import { LoginModule } from './login/login.module';
import { MdmModule } from './mdm/mdm.module';
import { PqLayoutModule } from './pq-layout/pq-layout.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    MdmModule,
    PqLayoutModule,
    LoginModule,
    ConverterModule,
    HistoryModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: []
})
export class AppModule {}

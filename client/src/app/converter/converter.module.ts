import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FeaturesModule } from '../features/features.module';
import { MdmModule } from '../mdm/mdm.module';
import { StorageModule } from '../storage/storage.module';

import { ConverterPageComponent } from './converter-page/converter-page.component';
import { ExchangeHistoryRatesComponent } from './exchange-history-rates/exchange-history-rates.component';
import { ExchangeHistoryComponent } from './exchange-history/exchange-history.component';

@NgModule({
  declarations: [
    ConverterPageComponent,
    ExchangeHistoryComponent,
    ExchangeHistoryRatesComponent
  ],
  imports: [
    CommonModule,
    MdmModule,
    FeaturesModule,
    ReactiveFormsModule,
    StorageModule
  ]
})
export class ConverterModule {}

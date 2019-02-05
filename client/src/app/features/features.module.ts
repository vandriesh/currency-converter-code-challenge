import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CurrenciesService } from './currencies/currencies.service';

@NgModule({
  declarations: [],
  exports: [
    CurrenciesService
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule { }

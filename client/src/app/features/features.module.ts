import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CurrenciesService } from './currencies/currencies.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [CurrenciesService]
})
export class FeaturesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FeaturesModule } from '../features/features.module';
import { MdmModule } from '../mdm/mdm.module';

import { ConverterPageComponent } from './converter-page/converter-page.component';

@NgModule({
  declarations: [ConverterPageComponent],
  imports: [CommonModule, MdmModule, FeaturesModule, ReactiveFormsModule]
})
export class ConverterModule {}

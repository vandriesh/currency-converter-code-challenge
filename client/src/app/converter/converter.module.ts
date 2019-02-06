import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FeaturesModule } from '../features/features.module';
import { MdmModule } from '../mdm/mdm.module';
import { StorageModule } from '../storage/storage.module';

import { ConverterPageComponent } from './converter-page/converter-page.component';

@NgModule({
  declarations: [ConverterPageComponent],
  imports: [CommonModule, MdmModule, FeaturesModule, ReactiveFormsModule, StorageModule]
})
export class ConverterModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MdmModule } from '../mdm/mdm.module';

import { ConverterPageComponent } from './converter-page/converter-page.component';

@NgModule({
  declarations: [ConverterPageComponent],
  imports: [CommonModule, MdmModule, ReactiveFormsModule]
})
export class ConverterModule {}

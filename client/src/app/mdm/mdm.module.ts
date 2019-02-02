import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const matModules = [
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...matModules
  ],
  exports: [
    BrowserAnimationsModule,
    ...matModules
  ]
})
export class MdmModule { }

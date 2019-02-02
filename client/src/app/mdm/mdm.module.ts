import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatOptionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule,
  MatGridListModule, MatSelectModule, MatDialogModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

const matModules = [
  FlexLayoutModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatGridListModule,
  MatTooltipModule,
  MatBadgeModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...matModules],
  exports: [BrowserAnimationsModule, ...matModules]
})
export class MdmModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  exports: [BrowserAnimationsModule, ...matModules],
  imports: [CommonModule, ...matModules]
})
export class MdmModule {}

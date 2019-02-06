import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdmModule } from '../mdm/mdm.module';
import { StorageModule } from '../storage/storage.module';

import { ConversionHistoryComponent } from './conversion-history/conversion-history.component';
import { HistoryPageComponent } from './history-page/history-page.component';

@NgModule({
  declarations: [HistoryPageComponent, ConversionHistoryComponent],
  imports: [CommonModule, MdmModule, StorageModule]
})
export class HistoryModule {}

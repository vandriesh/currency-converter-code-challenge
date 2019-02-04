import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdmModule } from '../mdm/mdm.module';

import { HistoryPageComponent } from './history-page/history-page.component';

@NgModule({
  declarations: [HistoryPageComponent],
  imports: [CommonModule, MdmModule]
})
export class HistoryModule {
}

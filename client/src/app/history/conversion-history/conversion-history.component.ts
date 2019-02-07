import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CurrencyOperation } from '../../features/currencies/currencies.service';

@Component({
  selector: 'app-conversion-history',
  styleUrls: ['./conversion-history.component.scss'],
  templateUrl: './conversion-history.component.html'
})
export class ConversionHistoryComponent implements OnInit {
  displayedColumns = ['timestamp', 'Event', 'Actions'];

  @Input() dataSource: CurrencyOperation[];
  @Output() deleteEventEmitter: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  emitDeleteEvent(id: string) {
    this.deleteEventEmitter.emit(id);
  }

  showLog(id: any) {
    console.log(`clicked on operation ${id}`);
  }
}

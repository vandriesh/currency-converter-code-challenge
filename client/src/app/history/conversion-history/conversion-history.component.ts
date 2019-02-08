import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {}

  emitDeleteEvent(id: string) {
    this.deleteEventEmitter.emit(id);
  }

  showLog(id: any) {
    this.router.navigate(['/converter', id]);
  }
}

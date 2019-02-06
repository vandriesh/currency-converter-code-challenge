import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { LocalStorageService } from './local-storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [LocalStorageService]
})
export class StorageModule { }

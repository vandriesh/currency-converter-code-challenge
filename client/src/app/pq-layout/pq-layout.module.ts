import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginModule } from '../login/login.module';
import { MdmModule } from '../mdm/mdm.module';

import { PqNavigationComponent } from './pq-navigation/pq-navigation.component';

@NgModule({
  declarations: [PqNavigationComponent],
  exports: [
    PqNavigationComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    LoginModule,
    MdmModule,
  ]
})
export class PqLayoutModule { }

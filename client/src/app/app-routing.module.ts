import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConverterPageComponent } from './converter/converter-page/converter-page.component';
import { HistoryPageComponent } from './history/history-page/history-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';

const routes: Routes = [
  {
    component: LoginPageComponent,
    path: 'login'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo : '/converter'
  },
  {
    component: ConverterPageComponent,
    path: 'converter'
  },
  {
    component: HistoryPageComponent,
    path: 'history'
  },
  {
    component: LoginPageComponent,
    path: 'logout'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}

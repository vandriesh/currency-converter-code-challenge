import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConverterPageComponent } from './converter/converter-page/converter-page.component';
import { HistoryPageComponent } from './history/history-page/history-page.component';
import { AuthGuard } from './login/auth/auth.guard';
import { LoginPageComponent } from './login/login-page/login-page.component';

const routes: Routes = [
  {
    component: LoginPageComponent,
    path: 'login'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/converter'
  },
  {
    canActivate: [AuthGuard],
    component: ConverterPageComponent,
    path: 'converter'
  },
  {
    canActivate: [AuthGuard],
    component: ConverterPageComponent,
    path: 'converter/:id'
  },
  {
    canActivate: [AuthGuard],
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
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard]
})
export class AppRoutingModule {}

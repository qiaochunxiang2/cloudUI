import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: '', component: AppComponent, data: {reuse: false, track: false}},
  {path: 'login',loadChildren: () => import('./login/login.module').then(m => m.LoginModule), data: {reuse: false, track: false}},
  {path: 'index', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule), data: {reuse: false, track: false}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

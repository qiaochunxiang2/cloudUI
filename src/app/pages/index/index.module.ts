import {NgModule} from '@angular/core';
import {Routes, RouterModule, RouteReuseStrategy} from '@angular/router';
import {IndexComponent} from './index.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserComponent} from './user/user.component';
import {EmptyComponent} from './empty/empty.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {InspurRouteReuse} from '../../core/routereuse/routeReuse';
import {UpdateavatarComponent} from './updateavatar/updateavatar.component';
import {Updateavatar2Component} from './updateavatar2/updateavatar2.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      {path: '', redirectTo: 'welcome', pathMatch: 'full', data: {reuse: false, track: false}},
      {path: 'welcome', component: WelcomeComponent, data: {title: '首页'}},
      {path: 'userCenter', component: UserComponent, data: {title: '个人中心'}},
      {path: 'empty', component: EmptyComponent, data: {title: 'loading'}},
      {path: 'changepassword', component: ChangepasswordComponent, data: {title: '修改密码'}},
      {path: 'updateavatar', component: UpdateavatarComponent, data: {title: '修改头像'}},
    ], data: {reuse: false, track: false}
  },
];

@NgModule({
  declarations: [
    IndexComponent,
    WelcomeComponent,
    UserComponent,
    EmptyComponent,
    ChangepasswordComponent,
    UpdateavatarComponent,
    Updateavatar2Component
  ],
  imports: [
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: InspurRouteReuse},
  ]
})
export class IndexModule {
}

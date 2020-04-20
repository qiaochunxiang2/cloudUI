import {NgModule} from '@angular/core';
import {Routes, RouterModule, RouteReuseStrategy} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InspurRouteReuse} from '../../core/routereuse/routeReuse';
import { CloudComponent } from './cloud.component';
import { CloudlistComponent } from './cloudlist/cloudlist.component';
import { CloudapplyComponent } from './cloudapply/cloudapply.component';
import {CloudRoutingModule} from './cloud-routing.module';
import { CloudFrameworkComponent } from './cloud-framework/cloud-framework.component';



@NgModule({
  declarations: [
  CloudComponent,
  CloudlistComponent,
  CloudapplyComponent,
  CloudFrameworkComponent],
  imports: [
    // RouterModule.forChild(routes),
    CloudRoutingModule,
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
export class CloudModule {
}

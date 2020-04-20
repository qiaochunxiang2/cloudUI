import {NgModule} from '@angular/core';
import {RouterModule, RouteReuseStrategy} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InspurRouteReuse} from '../../core/routereuse/routeReuse';
import {EditorMdDirective} from '../../core/editor/editor-md.directive';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';
import {SendblogComponent} from './sendblog/sendblog.component';
import { BlogdetailedComponent } from './blogdetailed/blogdetailed.component';
import { PersonblogComponent } from './personblog/personblog.component';

// const routes: Routes = [
//   {
//     path: '', component: BlogComponent, children: [
//       {path: '', redirectTo: 'welcome', pathMatch: 'full', data: {reuse: false, track: false}},
//     ], data: {reuse: false, track: false}
//   },
// ];

@NgModule({
  declarations: [
    EditorMdDirective,
    BlogComponent,
    SendblogComponent,
    BlogdetailedComponent,
    PersonblogComponent
  ],
  imports: [
    // RouterModule.forChild(routes),
    BlogRoutingModule,
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule, BlogdetailedComponent],
  providers: [
    {provide: RouteReuseStrategy, useClass: InspurRouteReuse},
  ]
})
export class BlogModule {
}

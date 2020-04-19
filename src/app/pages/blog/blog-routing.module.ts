import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {BlogComponent} from './blog.component';
import {SendblogComponent} from './sendblog/sendblog.component';

const routes: Routes = [
  /**************挂自己功能组件 */

  { path: '', component: BlogComponent, data: {'title': '博客管理'}},
  { path: 'sendBlog', component: SendblogComponent, data: {'title': '发布博客'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: one-variable-per-declaration
// export const MopsRouting.moduleRoutes = RouterModule.forChild(routes);
export class BlogRoutingModule {
}

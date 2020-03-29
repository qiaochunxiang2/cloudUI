import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {
  NzButtonModule, NzCardModule,
  NzCheckboxModule,
  NzFormModule, NzIconModule,
  NzInputModule,
  NzMessageServiceModule
} from 'ng-zorro-antd';

const routes: Routes = [
  {path:'',component:LoginComponent,data:{reuse:false,track:false}}
];


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzButtonModule,
    NzFormModule,
    NzMessageServiceModule,
    NzInputModule,
    NzCheckboxModule,
    NzIconModule,
    RouterModule.forChild(routes),
    NzCardModule
  ],
})
export class LoginModule { }

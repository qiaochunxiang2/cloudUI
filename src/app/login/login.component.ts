import {AfterViewInit, Component, OnInit, } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './service/login.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  pics = [
    {pic: 'img_002.png', title: '大型装备'},
    {pic: 'img_006.png', title: '航空航天'},
    {pic: 'img_008.png', title: '船舶制造'},
    {pic: 'img_003.png', title: '桥梁工程'},
    {pic: 'img_004.png', title: '兵器装备'},
  ];
  background;

  constructor(private fb: FormBuilder,
              private loginservice: LoginService,
              private route: Router,
              private message: NzMessageService
  ) {
  }

  login() {
    this.loginservice.login(this.validateForm.value.username, this.validateForm.value.password).then(res => {
      if (res['data'] != false) {
        localStorage.setItem('clouduser', JSON.stringify(res['data']));
        this.message.success('登录成功 ，' + res['data'].name);
        setTimeout(()=>{
          this.route.navigate(['/index/welcome']);
        }, 200);
        }else{
        this.message.error('账号或者密码错误');
      }
    });
  }

  ngOnInit(): void {
    this.background = 'url("../../assets/src/img/login.png")';
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}

import {AfterViewInit, Component, OnInit, } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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
              private http: HttpClient,
  ) {
  }

  login() {
    console.log(this.validateForm);
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

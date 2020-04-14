import { Component,OnInit } from '@angular/core';

import {NzMessageService} from 'ng-zorro-antd';

import {EditorConfig} from '../../../core/editor/model/editor-config';
import {Router} from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})

export class WelcomeComponent implements OnInit {

  constructor(private message: NzMessageService,
              private router: Router,) {}

  ngOnInit(): void {
  }


}

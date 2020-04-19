import { Component, OnInit } from '@angular/core';
import {EditorConfig} from '../../../core/editor/model/editor-config';

@Component({
  selector: 'app-sendblog',
  templateUrl: './sendblog.component.html',
  styleUrls: ['./sendblog.component.less']
})
export class SendblogComponent implements OnInit {

  title = 'app';

  conf = new EditorConfig();
  markdown = '测试语句';

  // 同步属性内容
  syncModel(str): void {
    this.markdown = str;
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {EditorConfig} from '../../core/editor/model/editor-config';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit {
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

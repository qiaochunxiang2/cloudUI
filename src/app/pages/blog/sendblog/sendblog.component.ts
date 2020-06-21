import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EditorConfig} from '../../../core/editor/model/editor-config';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BlogService} from '../service/blog.service';

@Component({
  selector: 'app-sendblog',
  templateUrl: './sendblog.component.html',
  styleUrls: ['./sendblog.component.less']
})
export class SendblogComponent implements OnInit {
  title = 'app';
  markdown = '';
  conf = new EditorConfig();
  @Output() result = new EventEmitter();
  blogData = {
    uid: '',
    title: '',
    content: ''
  };

  constructor(
    private message: NzMessageService,
    private blogService: BlogService,
    private modalService: NzModalService
  ) {
  }

  // 同步属性内容
  syncModel(str): void {
    this.markdown = str;
  }

  ngOnInit(): void {
  }

  publish() {
    if (this.check()) {
      this.modalService.warning({
        nzTitle: null,
        nzContent: '<b style="color:#1b86d7;">您确定要发表此博客吗？</b>',
        nzOkText: '确定',
        nzOnOk: () => this.publishConfirm(),
        nzCancelText: '取消',
        nzOnCancel: () => console.log('Cancel')
      });

    } else {
      this.message.error('标题和内容不能为空');
    }
  }

  check() {
    if (this.blogData.title == null || this.blogData.title == '') {
      return false;
    }
    return !(this.markdown == null || this.markdown == '');
  }

  publishConfirm() {
    let user = localStorage.getItem('clouduser');
    let userData = JSON.parse(user);
    this.blogData.uid = userData['id'];
    this.blogData.content = this.markdown;
    this.blogService.publish(this.blogData).then(res => {
      if (res['data']) {
        this.message.success('发布成功');
        setTimeout(() => {
          this.result.emit(true);
        }, 200);
      }
    });
  }
}

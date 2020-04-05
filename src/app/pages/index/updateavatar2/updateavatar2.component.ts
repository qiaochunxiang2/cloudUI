import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {UserService} from '../service/user.service';
import {ImgService} from '../../../core/service/img.service';

@Component({
  selector: 'app-updateavatar2',
  templateUrl: './updateavatar2.component.html',
  styleUrls: ['./updateavatar2.component.less']
})
// 本修改头像组件采用的模式是，先上传新头像，然后异步删除旧头像
export class Updateavatar2Component implements OnInit {

  loading = false;
  avatarUrl;
  updateFile: File;
  @Input() isVisible = false;
  @Output() result = new EventEmitter();

  constructor(
    private message: NzMessageService,
    private userService: UserService,
    private imgService: ImgService,
  ) {}

  beforeUpload = (file: File) => {
    this.updateFile = file;
    this.getBase64(file, (img) => {
      this.loading = false;
      this.avatarUrl = img;
    });
    return false;
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    let reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  updatePhoto() {
    let data = JSON.parse(localStorage.getItem('clouduser'));
    let id = data.id;
    let oldKey = data['information']['imageUrl'];
    this.userService.uploadPhoto(this.updateFile, id, oldKey).then(res => {
      if (res['data'] != false) {
        this.result.emit(false);
        this.imgService.changeImageMessage2(res['data']);
        console.log(res['data']);
      } else {
        this.message.error('无法更改头像，请联系开发人员。');
      }
    });
  }

  ngOnInit() {
    this.imgService.imageMessage.subscribe(message => {
      this.avatarUrl = message;
    });
  }

  handleCancel(): void {
    this.result.emit(false);
  }
}

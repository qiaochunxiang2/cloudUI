import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {UserService} from '../service/user.service';
import {ImgService} from '../../../core/service/img.service';

@Component({
  selector: 'app-updateavatar',
  templateUrl: './updateavatar.component.html',
  styleUrls: ['./updateavatar.component.less']
})
// 本组件采用的方式是覆盖之前的文件，然后刷新缓存
export class UpdateavatarComponent implements OnInit {

  loading = false;
  avatarUrl;
  updateFile: File;
  @Input() isVisible = false;
  @Output() result = new EventEmitter();

  constructor(
    private message: NzMessageService,
    private userService: UserService,
    private imgService: ImgService,
  ) {
  }

  beforeUpload = (file: File) => {
    this.updateFile = file;
    this.getBase64(file, (img) => {
      this.loading = false;
      this.avatarUrl = img;
    });
    return false;
  };

  // 图片转base64
  private getBase64(img: File, callback: (img: string) => void): void {
    let reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  updatePhoto() {
    let data = JSON.parse(localStorage.getItem('clouduser'));
    let id = data.id;
    let key = data['information']['imageUrl'];
    this.userService.updatePhoto(this.updateFile, id, key).then(res => {
      if (res['data'] == true) {
        this.result.emit(false);
        this.imgService.changeImageMessage(this.avatarUrl);
        this.message.success('头像更改成功');
      }else if (res['data'] != false) {
        this.result.emit(false);
        this.imgService.changeImageMessage(this.avatarUrl);
        let userdata = localStorage.getItem('clouduser');
        userdata = JSON.parse(userdata);
        userdata['information']['imageUrl'] = res['data'];
        localStorage.setItem('clouduser', JSON.stringify(userdata));
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

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  public imageMessage = new BehaviorSubject<string>('');
  public user;

  constructor(
    private url: UrlService
  ) {
    let userdata = localStorage.getItem('clouduser');
    this.user = JSON.parse(userdata);
    let imageUrl = this.url.dominName + this.user['information']['imageUrl'] + this.url.imageChuli;
    this.imageMessage.next(imageUrl);
  }

  // 覆盖上传，刷新
  changeImageMessage(message: string) {
    this.imageMessage.next(message);
  }

  // 上传新文件，删除旧文件
  changeImageMessage2(message: string) {
    let messageUrl = this.url.dominName + message + this.url.imageChuli;
    this.imageMessage.next(messageUrl);
    this.user['information']['imageUrl'] = message;
    localStorage.setItem('clouduser', JSON.stringify(this.user));
  }
}

import {Injectable} from '@angular/core';
import {UrlService} from '../../../core/service/url.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public hostname = this.url.hostname;
  public changePasswordUrl = this.hostname + '/user/changePassword';
  public updatePhotoUrl = this.hostname + '/qiniu/updatePhoto';
  public uploadUrl = this.hostname + '/qiniu/uploadPhoto';
  public updateInformationUrl = this.hostname + '/user/updateInformation';
  constructor(
    private url: UrlService,
    private http: HttpClient
  ) {
  }

  changePassword(data) {
    let user = localStorage.getItem('clouduser');
    user = JSON.parse(user);
    let jsondata = {
      username: user['username'],
      oldPassword: data['oldPassword'],
      newPassword: data['newPassword']
    };
    jsondata = JSON.parse(JSON.stringify(jsondata));
    return new Promise((resolve, reject) => {
      this.http.post(this.changePasswordUrl, jsondata).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  //  上传图片，然后刷新
  updatePhoto(file: File, id: any,key: any) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    formData.append("key",key);
    return new Promise((resolve, reject) => {
      this.http.post(this.updatePhotoUrl, formData).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  // 上传新头像，删除旧头像
  uploadPhoto(file: File, id: any, oldKey: any) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    formData.append('oldKey', oldKey);
    return new Promise((resolve, reject) => {
      this.http.post(this.uploadUrl, formData).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateInformation(data: any){
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.updateInformationUrl, data).toPromise().then(res =>{
        resolve(res);
      }, error=>{
        reject(error);
      })
    })
  }
}

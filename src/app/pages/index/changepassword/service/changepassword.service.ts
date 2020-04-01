import {Injectable} from '@angular/core';
import {UrlService} from '../../../../core/service/url.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {
  public hostname = this.url.hostname;
  public changePasswordUrl = this.hostname + '/user/changePassword';

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
}

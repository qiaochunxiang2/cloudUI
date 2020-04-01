import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlService} from '../../core/service/url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl;

  constructor(
    private http: HttpClient,
    private url: UrlService,
  ) {
    this.loginUrl = this.url.hostname + '/user/login';
  }

  login(username, password) {
    let data = {username, password};
    data = JSON.parse(JSON.stringify(data));
    return new Promise(((resolve, reject) => {
      this.http.post(this.loginUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    }));
  }
}

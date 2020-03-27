import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlService} from '../core/service/url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginurl = this.url.hostname + '/login';

  constructor(
    private http: HttpClient,
    private url: UrlService,
  ) {
  }

  login(username, password) {
    let data = {username, password};
    data = JSON.parse(JSON.stringify(data));
    return new Promise(((resolve, reject) => {
      this.http.post(this.loginurl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    }));
  }
}

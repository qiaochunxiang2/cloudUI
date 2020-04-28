import {Injectable} from '@angular/core';
import {UrlService} from '../../../core/service/url.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  public findAllUrl = this.url.hostname + '/cloud/findAll';
  public saveCloudUrl = this.url.hostname + '/cloud/apply';
  public shutdownCloudUrl = this.url.hostname + '/cloud/shutdown';
  public restartCloudUrl = this.url.hostname + '/cloud/restart';


  constructor(
    private url: UrlService,
    private http: HttpClient
  ) {
  }

  findAllCloud(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(this.findAllUrl + '?userId=' + userId).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  save(data) {
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.saveCloudUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  shutdown(data) {
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.shutdownCloudUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  restart(data) {
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.restartCloudUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}

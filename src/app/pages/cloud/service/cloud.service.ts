import {Injectable} from '@angular/core';
import {UrlService} from '../../../core/service/url.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  public findAllUrl = this.url.hostname + '/cloud/findAll';
  public saveCloudUrl = this.url.hostname + '/cloud/apply';
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

  save(data){
    data = JSON.parse(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      this.http.post(this.saveCloudUrl, data).toPromise().then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}

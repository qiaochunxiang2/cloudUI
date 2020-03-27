import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare var CONFIG: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configPath = '/assets/webconfig.json';

  constructor(private http: HttpClient) {
  }

  getConfig() {
   return this.http.get(this.configPath);
  }

}

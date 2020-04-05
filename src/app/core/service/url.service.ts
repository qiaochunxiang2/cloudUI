import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  configPath="/assets/config/webconfig/webconfig.json";

  public hostname;
  public hostUrl;
  public hostPort;
  public dominName;
  public imageChuli;
  constructor(
    private http: HttpClient,
    private config: ConfigService

  ) {
    let webconfig = this.config.getConfig(this.configPath);
    if (webconfig){
      this.hostPort = webconfig['PORT'];
      this.hostUrl = webconfig['ORIGIN'];
      this.hostname = this.hostUrl + this.hostPort;
      this.dominName = webconfig['DOMINNAME'];
      this.imageChuli = webconfig['IMAGECHULI']
    }
  }

}

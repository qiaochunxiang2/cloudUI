import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public hostname = 'http://localhost:8080';

  constructor(

  ) {
  }


}

//运行时读取配置文件的服务

import {Injectable} from '@angular/core';
import * as ejs from 'src/assets/js/configLoader.js';

declare var CONFIG: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {
  }

  getConfig(url) {
    let loader = new CONFIG.ConfigLoader(url);
    return loader.getWebConfig();
  }

}

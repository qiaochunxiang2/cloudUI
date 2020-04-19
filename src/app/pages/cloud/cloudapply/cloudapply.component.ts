import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cloudapply',
  templateUrl: './cloudapply.component.html',
  styleUrls: ['./cloudapply.component.less']
})
export class CloudapplyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  payType;
  selectSystem;
  selectSystemBanben;
  selectVCPU;
  systems= ['centos','Windows Server','Ubuntu','Aliyun linux','Red Hat'];
  systemsBanBen = {
    'centos': ['7.5 64位','7.6 64位','8.1 64位','8.2 64位','8.3 64位','8.4 64位','8.5 64位','8.6 64位',],
    'Windows Server': ['Windows XP', 'Windows 2006', 'Windows 2007', 'Windows 2008', 'Windows 2010'],
    'Ubuntu': ['2.2', '2.3', '2.4'],
    'Aliyun linux': ['2.1903 64位'],
    'Red Hat': ['Enterprise Linux 8 64位','Enterprise Linux 7.9 64位','Enterprise Linux 7.8 64位','Enterprise Linux 7.9 64位','Enterprise Linux 8 64位']
  };
  vCPUS= [{title: '1vCPU', value: 1}, {title: '2vCPU', value: 2}, {title: '4vCPU', value: 4}, {title: '8vCPU', value: 8}, {title: '16vCPU', value: 16}, {title: '24vCPU', value: 24},];
  selectMemory;
  memorys = [0.5,1,2,4,8,12,16,24,32,64,96];
  selectAddress;
  selectHardpan = 40;
  systemChange(data){
    this.selectSystem = data;
    this.selectSystemBanben = null;
  }
}

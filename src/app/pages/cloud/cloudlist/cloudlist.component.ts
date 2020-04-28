import {Component, OnInit} from '@angular/core';
import {CloudService} from '../service/cloud.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-cloudlist',
  templateUrl: './cloudlist.component.html',
  styleUrls: ['./cloudlist.component.less']
})
export class CloudlistComponent implements OnInit {
  selectData;
  listOfData = [];
  applyVisible = false;
  shutdownAndRestart = false;
  selectedIndex;

  constructor(
    private cloudService: CloudService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit() {
    this.findAllCloud();
  }

  changeSelectData(data, index) {
    this.selectData = data;
    this.selectedIndex = index;
    this.shutdownAndRestart = this.selectData != null && this.selectData['state'] == 1;
  }

  findAllCloud() {
    let user = localStorage.getItem('clouduser');
    user = JSON.parse(user);
    let userId = user['id'];
    this.cloudService.findAllCloud(userId).then(res => {
      if (res['data']) {
        this.listOfData = res['data'];
      } else {
        this.message.error('服务器错误，请稍后再试');
      }
    });
  }

  applyOpen() {
    this.applyVisible = true;
  }

  applyBack(data) {
    this.applyVisible = false;
    if (data == 2) {
      this.findAllCloud();
    }
  }


  shutdown() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要关机吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.shutdownConfirm(),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });

  }

  shutdownConfirm() {
    this.listOfData[this.selectedIndex]['state'] = 2;
    this.shutdownAndRestart = false;
    this.cloudService.shutdown(this.selectData).then(res => {
      if (res['data']) {
        this.message.success('关闭成功');
      } else {
        this.message.error('未知错误，请联系管理员');
      }
      this.listOfData[this.selectedIndex]['state'] = 0;
    });
  }

  restart() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要重启吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.restartConfirm(),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  restartConfirm() {
    this.listOfData[this.selectedIndex]['state'] = 3;
    this.shutdownAndRestart = false;
    this.cloudService.restart(this.selectData).then(res => {
      if (res['data']) {
        this.message.success('重启成功');
      } else {
        this.message.error('未知错误，请联系管理员');
      }
      this.listOfData[this.selectedIndex]['state'] = 1;
      this.shutdownAndRestart = true;
    });
  }
}

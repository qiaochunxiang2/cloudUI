import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CloudService} from '../service/cloud.service';

@Component({
  selector: 'app-cloudapply',
  templateUrl: './cloudapply.component.html',
  styleUrls: ['./cloudapply.component.less']
})
export class CloudapplyComponent implements OnInit {
  @Input() isVisible = false;
  @Output() result = new EventEmitter();
  @Output() saveResult = new EventEmitter();
  isConfirmLoading;
  formatterPercent = (value: number) => `${value} G`;
  parserPercent = (value: string) => value.replace(' G', '');
  cloudData = {
    core: null,
    memory: 2,
    hardpan: 40,
    bandWith: null,
    userId: null
  };
  constructor(
    private message: NzMessageService,
    private cloudService: CloudService,
    private modalService: NzModalService
  ) {
  }
  coreRequired;
  memoryRequired;
  hardpanRequired;
  bandWithRequired;
  ngOnInit() {
  }

  back() {
    this.coreRequired = false;
    this.memoryRequired = false;
    this.hardpanRequired = false;
    this.bandWithRequired = false;
    this. cloudData = {
      core: null,
      memory: 2,
      hardpan: 40,
      bandWith: null,
      userId: null
    };
    this.result.emit(false);
  }

  save() {
    let user = localStorage.getItem('clouduser');
    this.isConfirmLoading = true;
    user = JSON.parse(user);
    this.cloudData.userId = user['id'];
    this.cloudService.save(this.cloudData).then(res => {
      if (res['data']) {
        this.message.success('服务器申请成功');
        setTimeout(() => {
          this. cloudData = {
            core: null,
            memory: 2,
            hardpan: 40,
            bandWith: null,
            userId: null
          };
          this.saveResult.emit(false);
        }, 300);
      } else {
        this.message.error('服务器错误');
      }
      this.isConfirmLoading = false;
    });

  }

  memoryChange() {
    this.memoryRequired = this.cloudData['memory'] == null;
  }

  coreChange() {
    this.coreRequired = this.cloudData['core'] == null;
  }

  hardpanChange() {
    this.hardpanRequired = this.cloudData['hardpan'] == null;
  }

  bandWithChange() {
    this.bandWithRequired = this.cloudData['bandWith'] == null;
  }

  confirm() {
    this.memoryRequired = this.cloudData['memory'] == null;
    this.coreRequired = this.cloudData['core'] == null;
    this.hardpanRequired = this.cloudData['hardpan'] == null;
    this.bandWithRequired = this.cloudData['bandWith'] == null;
  }

  saveConfirm() {
    this.confirm();
    if (!this.coreRequired && !this.memoryRequired && !this.bandWithRequired && !this.hardpanRequired) {
      this.modalService.warning({
        nzTitle: null,
        nzContent: '<b style="color:#1b86d7;">您确定要申请服务器吗？</b>',
        nzOkText: '确定',
        nzOnOk: () => this.save(),
        nzCancelText: '取消',
        nzOnCancel: () => console.log('Cancel')
      });
    } else {
      this.message.warning('请选择服务器配置');
    }
  }
}

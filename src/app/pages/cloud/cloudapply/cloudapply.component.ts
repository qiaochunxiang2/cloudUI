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
    this.result.emit(false);
  }

  save(){
    console.log(this.cloudData);
    let user = localStorage.getItem('clouduser');
    this.isConfirmLoading = true;
    user = JSON.parse(user);
    this.cloudData.userId = user['id'];
    this.cloudService.save(this.cloudData).then(res=>{
      if (res['data']){
        this.message.success('服务器申请成功');
        setTimeout(()=>{
          this.saveResult.emit(false);
        }, 300);
      } else{
        this.message.error('服务器错误');
      }
      this.isConfirmLoading = false;
    })
  }
}

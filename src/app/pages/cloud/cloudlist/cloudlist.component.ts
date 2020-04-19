import { Component, OnInit } from '@angular/core';
import {CloudService} from '../service/cloud.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-cloudlist',
  templateUrl: './cloudlist.component.html',
  styleUrls: ['./cloudlist.component.less']
})
export class CloudlistComponent implements OnInit {
  selectData;
  listOfData = [];
  constructor(
    private cloudService: CloudService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
this.findAllCloud();
  }
  changeselectData(data){
    this.selectData = data;
  }

  findAllCloud(){
    let user = localStorage.getItem('clouduser');
    user = JSON.parse(user);
    let userId = user['id'];
    this.cloudService.findAllCloud(userId).then(res=>{
      if (res['data']){
        this.listOfData = res['data'];
      }else{
        this.message.error('服务器错误，请稍后再试');
      }
    })
  }
}

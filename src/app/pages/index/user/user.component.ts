import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  loading = false;
  updateAvatarVisible = false;
  imageUrl = 'http://q87xedep1.bkt.clouddn.com/9ccdd80b527748d9a64d4f95fae35281';
  editDisable = true;
  user;
  userData;
  emailTrue = true;
  phoneTrue = true;
  qqTrue = true;

  constructor(
    private message: NzMessageService,
    private modelService: NzModalService
  ) {

  }

  showUpdateAvatar() {
    this.updateAvatarVisible = true;
  }

  closeUpdateAvatar() {
    this.updateAvatarVisible = false;
  }

  ngOnInit() {
    let userdata = localStorage.getItem('clouduser');
    this.user = JSON.parse(userdata);
    this.userData = JSON.parse(userdata);
  }

  edit() {
    this.editDisable = false;
  }

  cancel() {
    this.modelService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">有数据还没保存，您确定要取消吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.collback(),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });

  }

  collback() {
    this.user = JSON.parse(JSON.stringify(this.userData));
    this.editDisable = true;
  }

  save() {
    this.editDisable = true;
    this.userData = JSON.parse(JSON.stringify(this.user));
  }

  emailChecking() {
    if (this.user['information']['email'] == null || this.user['information']['email'] == '') {
      this.emailTrue = true;
      return;
    }
    let szReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
    this.emailTrue = szReg.test(this.user['information']['email']);
  }

  phoneChecking() {
    if (this.user['information']['phone'] == null || this.user['information']['phone'] == '') {
      this.phoneTrue = true;
      return;
    }
    let phoneCheck = /^1([3456789])\d{9}$/;
    this.phoneTrue = phoneCheck.test(this.user['information']['phone']);
  }

  qqChecking() {
    if (this.user['information']['qq'] == null || this.user['information']['qq'] == '') {
      this.qqTrue = true;
      return;
    }
    let qqCheck = /[1-9][0-9]{4,14}$/;
    this.qqTrue = qqCheck.test(this.user['information']['qq']);
  }
}

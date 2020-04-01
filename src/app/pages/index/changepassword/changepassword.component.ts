import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ChangepasswordService} from './service/changepassword.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {InspurRouteReuse} from '../../../core/routereuse/routeReuse';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.less']
})
export class ChangepasswordComponent implements OnInit {
  @ViewChild('header', {static: false}) header: ElementRef;
  @ViewChild('background', {static: false}) background: ElementRef;
  passwordForm;

  constructor(
    private fb: FormBuilder,
    private passwordService: ChangepasswordService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]]
    });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.passwordForm.controls.newPassword.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  ngOnInit() {
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.passwordForm.reset();
    for (const key in this.passwordForm.controls) {
      this.passwordForm.controls[key].markAsPristine();
      this.passwordForm.controls[key].updateValueAndValidity();
    }
  }
  changePassword(){
    this.passwordService.changePassword(this.passwordForm.value).then(res=>{
      if (res['data'] == true){
        this.message.success("密码修改成功，请重新登录");
        delete localStorage['clouduser'];
        setTimeout(()=>{
          InspurRouteReuse.deleteAll();
          this.passwordForm.reset();
          this.router.navigate(['/']);
        },200);
      }else if (res['data'] == false){
        this.message.warning('原密码错误');
      } else{
        this.message.error(res['data']);
      }

    });
  }
}

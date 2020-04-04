import { Component,OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {filter} from 'rxjs/operators';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  uploading = false;
  avatarUrl: string;
  fileList: UploadFile[] = [];
  constructor(private message: NzMessageService,
              private http: HttpClient) {}

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file); // 将上传内容存入fileList
    if (file.type !== 'image/png') { // 检查格式
      this.message.error(`Sorry, The file format is incorrect and only supports PNG format.`);
      this.uploading = false;
      this.fileList = [];
    }
    return false; // 手动上传的关键
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }
  handleUpload(): void { // 手动上传
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true; // 修改上传按钮状态
    const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, { });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.message.success('upload successfully.');
          this.ngOnInit(); // 上传成功后，可根据需要重新渲染页面
        },
        () => {
          this.uploading = false;
          this.fileList = [];
          this.message.error('upload failed.');
        }
      );
  }

  ngOnInit(): void {
  }
}

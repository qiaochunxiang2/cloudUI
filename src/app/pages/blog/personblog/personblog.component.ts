import { Component, OnInit } from '@angular/core';
import {BlogService} from '../service/blog.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-personblog',
  templateUrl: './personblog.component.html',
  styleUrls: ['./personblog.component.less']
})
export class PersonblogComponent implements OnInit {
  user;
  blogData = [];
  selectedBlog;
  blogDetailVisible = false;
  sendBlogVisible = false;
  constructor(
    private blogService: BlogService,
    private message: NzMessageService,
  ) {
  }
  ngOnInit(): void {
    this.userData();
    this.gePersontAllBlog();
  }

  gePersontAllBlog(){
    this.blogService.personAll(this.user['id']).then(res=>{
      if (res['data']){
        this.blogData = res['data'];
      } else{
        this.message.error('服务器错误');
      }
    })
  }

  changeSelectedBlog(data){
    this.selectedBlog = data;
    this.blogDetailVisible = true;
  }
  userData(){
  let userData = localStorage.getItem("clouduser");
  this.user = JSON.parse(userData);
  }

  publish(){
    this.sendBlogVisible = true;
  }

  publishResult(){
    this.sendBlogVisible = false;
    this.gePersontAllBlog();
  }

  back(){
    this.blogDetailVisible = false;
  }
}

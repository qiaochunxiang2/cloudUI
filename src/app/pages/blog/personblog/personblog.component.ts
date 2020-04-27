import { Component, OnInit } from '@angular/core';
import {BlogService} from '../service/blog.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

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
    private modalService: NzModalService
  ) {
  }
  ngOnInit(): void {
    this.userData();
    this.getPersontAllBlog();
  }

  getPersontAllBlog(){
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
    this.getPersontAllBlog();
  }

  back(){
    this.blogDetailVisible = false;
  }

  deleteConfirm(blog){
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要删除此博客吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.deleteBlog(blog),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  deleteBlog(blog){
    this.blogService.deleteBlog(blog['id']).then(res=>{
      if (res['data']){
        this.message.success('删除成功');
        this.getPersontAllBlog();
      } else {
        this.message.error('服务器错误');
      }
    })
  }
}

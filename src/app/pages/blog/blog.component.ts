import { Component, OnInit } from '@angular/core';
import {BlogService} from './service/blog.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit {

  blogData = [];
  selectedBlog;
  blogDetailVisible = false;
  constructor(
    private blogService: BlogService,
    private message: NzMessageService,
  ) {
  }
  ngOnInit(): void {
    this.getAllBlog();
  }

  getAllBlog(){
    this.blogService.getAll().then(res=>{
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

  back(){
    this.blogDetailVisible = false;
  }
}

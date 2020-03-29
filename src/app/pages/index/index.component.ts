import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  isCollapsed = false;
  menu;
  constructor(
    private route: Router,
  ) {
    this.route.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          console.log('NavigationEnd:', this.route.url);
        }
      });
  }

  ngOnInit() {
  }
  logout(){
  }
  navigateTo(url: any){

  }
}


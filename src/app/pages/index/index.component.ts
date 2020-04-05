import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {InspurRouteReuse} from '../../core/routereuse/routeReuse';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ConfigService} from '../../core/service/config.service';
import {ImgService} from '../../core/service/img.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  menuPath = '/assets/config/menuconfig/menu.json';
  isCollapsed = false;
  menu;
  detailMenu: Array<any> = [
    {
      title: '首页', url: '/index/welcome'
    },
    {
      title: '修改密码', url: '/index/changepassword'
    },
    {
      title: '个人中心', url: '/index/userCenter',
    }
  ];
  tabs: Array<any> = [];
  tabIndex: number = 0;
  userPhoto;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private modalService: NzModalService,
    private imgService: ImgService,
  ) {

    InspurRouteReuse.deleteAll();
    this.menu = this.configService.getConfig(this.menuPath);
    this.digoutMenu(this.menu);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event) => {
      const url = this.router.url;
      if (['/', '/login', '/index', '/index/empty'].indexOf(url) < 0) {
        const existMenu = this.tabs.find(info => url.includes(info.url));
        if (!existMenu) {// 如果不存在那么添加，
          let a = this.detailMenu.find(m => url.includes(m.url));
          if (a == undefined) {
            this.message.info('未找到功能');
            return;
          }
          this.tabs.push(a);
        }
        this.tabIndex = this.tabs.findIndex(p => url.includes(p.url));
      }
    });
  }

  ngOnInit() {
    this.imgService.imageMessage.subscribe(message => {
      this.userPhoto = message;
    });
  }

  logout() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要注销吗</b>',
      nzOkText: '确定',
      nzOnOk: () => this.clear(),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  //跳转
  navigateTo(data: any) {
    if (data.hasOwnProperty('url')) {
      if (this.router.url == data.url) {
        return;
      }
      let a = this.detailMenu.find(m => data.url.includes(m.url));
      if (!a) {
        this.message.info('未找到功能');
        return;
      } else {
        this.router.navigate(['/index/empty']).then(res => {
          this.router.navigate([data.url]);
        });
      }
    } else {
      if (this.router.url == data) {
        return;
      }
      let a = this.detailMenu.find(m => data.includes(m.url));
      if (!a) {
        this.message.info('未找到功能');
        return;
      } else {
        this.router.navigate(['/index/empty']).then(res => {
          this.router.navigate([data]);
        });
      }
    }
  }

  menuSelected(menu: any) {
    try {
      return menu.url == this.tabs[this.tabIndex].url;
    } catch (e) {
    }
  }

  closeUrl(tab: any) {
    // 当前关闭的是第几个路由
    const index = this.tabs.findIndex(t => t == tab);
    if (this.tabs.length == 1) {
      if (tab.url == '/index/welcome') {
        return;
      } else {
        this.tabs = [];
        this.router.navigate(['/index/welcome']).then(res => {
          InspurRouteReuse.deleteRouteSnapshot(tab.url);
        }, err => {
          InspurRouteReuse.deleteRouteSnapshot(tab.url);
        });
      }
    } else {
      this.tabs.splice(index, 1);
      // 删除复用
      // 如果当前删除的对象是当前选中的，那么需要跳转
      if (this.tabIndex === index) {
        // 显示上一个选中
        let menu = this.tabs[index - 1];
        if (!menu) {// 如果上一个没有下一个选中
          menu = this.tabs[index];
        }
        // 跳转路由
        this.router.navigate([menu.url]).then(res => {
          InspurRouteReuse.deleteRouteSnapshot(tab.url);
        }, err => {
          InspurRouteReuse.deleteRouteSnapshot(tab.url);
        });
      }
      InspurRouteReuse.deleteRouteSnapshot(tab.url);
    }
  }

  updateView() {
    this.cdRef.detectChanges();
  }

  //拼明细节点菜单
  digoutMenu(menu) {
    menu.forEach(m => {
      if (m && m.hasOwnProperty('children')) {
        this.digoutMenu(m.children);
      } else {
        this.detailMenu.push(m);
      }
    });
  }


  clear() {
    delete localStorage['clouduser'];
    window.open('/', '_self');
  }
}


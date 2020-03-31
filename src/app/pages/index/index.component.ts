import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UrlService} from '../../core/service/url.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {NzDropdownContextComponent, NzDropdownService, NzMessageService, NzModalComponent, NzTabSetComponent} from 'ng-zorro-antd';
import {ConfigService} from '../../core/service/config.service';
import {LoginService} from '../../login/service/login.service';
import {CdkDragDrop, DragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {PlatformLocation} from '@angular/common';

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
  ];
  tabs: Array<any> = [];
  tabIndex: number = 0;
  tabDropDown: NzDropdownContextComponent;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dropDownService: NzDropdownService,
  ) {
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
  }

  logout() {
  }

  navigateTo(data: any) {
    if (data.hasOwnProperty('url')) {
      if (this.router.url == data.url) {
        return;
      }
      this.router.navigate(['/index/empty']).then(res => {
        this.router.navigate([data.url]);
      });
    } else {
      this.message.info('未找到功能');
      return;
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
          // InspurRouteReuse.deleteRouteSnapshot(tab.url);
        }, err => {
          // InspurRouteReuse.deleteRouteSnapshot(tab.url);
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
          // InspurRouteReuse.deleteRouteSnapshot(tab.url);
        }, err => {
          // InspurRouteReuse.deleteRouteSnapshot(tab.url);
        });
      }
      // InspurRouteReuse.deleteRouteSnapshot(tab.url);
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

  //tab右键菜单关闭
  dropDownClose() {
    if (this.tabDropDown) {
      this.tabDropDown.close();
    }
  }

  //tab中键,右键时触发
  onAuxClick(event: MouseEvent, tab: any) {
    //捕获中键
    if (event.button == 1 && event.which == 2) {
      this.closeUrl(tab);
    }
  }

  //动态创建tab右键菜单
  contextMenu($event: MouseEvent, template: TemplateRef<any>) {
    this.tabDropDown = this.dropDownService.create($event, template);
  }

}


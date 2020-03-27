import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  constructor(
    private router: Router
  ) {
    let clouduser = localStorage.getItem('clouduser');
    if (clouduser != null) {
      // this.router.navigate(['/index/workbench']);
      this.router.navigate(['/index/welcome']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

  }
}

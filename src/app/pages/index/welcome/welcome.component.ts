import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  test = 'aaaa';
  constructor() { }

  ngOnInit() {
  }

  change(){
    this.test='bbbb';
  }
}

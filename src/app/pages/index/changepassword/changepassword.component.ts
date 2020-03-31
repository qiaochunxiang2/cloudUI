import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.less']
})
export class ChangepasswordComponent implements OnInit {

  test = 'aaaa';
  constructor() { }

  ngOnInit() {
  }

  change(){
    this.test='bbbb';
  }
}
